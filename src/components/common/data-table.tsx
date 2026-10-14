import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUp, ArrowDown, Search, Download, Columns3, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { can } from "@/lib/roles";
import type { ScreenDef } from "@/types";
import { cellValue, isStatusColumn, statusValues, type Row } from "@/lib/records";
import { StatusBadge, ScoreBadge, ToneBadge } from "@/components/common/badges";
import { EmptyState } from "@/components/common/panel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const SCORE_KEYS = new Set(["score", "hseScore", "residual", "riskScore"]);

export function DataTable({
  screen,
  rows,
  onOpen,
  fill = false,
}: {
  screen: ScreenDef;
  rows: Row[];
  onOpen?: (row: Row) => void;
  /** Fit the table to 100% of its container with wrapping instead of horizontal scrolling. */
  fill?: boolean;
}) {
  const { t } = useI18n();
  const role = useAppStore((s) => s.role);
  const projectFilter = useAppStore((s) => s.projectFilter);
  const projects = useAppStore((s) => s.data.projects);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const baseCols = screen.columns ?? inferColumns(rows);
  const statusCol = baseCols.find((c) => isStatusColumn(c) && statusValues(rows, c).length > 0);

  const filtered = React.useMemo(() => {
    let out = rows;
    if (statusCol && statusFilter !== "all") {
      out = out.filter((r) => cellValue(r, statusCol) === statusFilter);
    }
    return out;
  }, [rows, statusCol, statusFilter]);

  const [visible, setVisible] = React.useState<string[]>(baseCols);
  React.useEffect(() => setVisible(baseCols), [screen.path, baseCols.join("|")]);

  const columns: ColumnDef<Row>[] = React.useMemo(() => {
    const sel: ColumnDef<Row> = {
      id: "__sel",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
          aria-label={t("table.selectAll")}
        />
        ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label={t("table.selectRow")}
        />
      ),
      enableSorting: false,
      size: 36,
    };
    const defs: ColumnDef<Row>[] = visible.map((key) => ({
      accessorFn: (r) => cellValue(r, key),
      id: key,
      header: humanize(key),
      cell: (info) => {
        const raw = info.row.original;
        const val = cellValue(raw, key);
        if (!val) return <span className="text-muted-foreground">—</span>;
        if (isStatusColumn(key)) return <StatusBadge value={val} className={fill ? "max-w-full break-all" : undefined} />;
        if (SCORE_KEYS.has(key)) {
          const n = Number(val);
          if (Number.isFinite(n)) return <ScoreBadge value={n} max={100} />;
        }
        if (key === "projectId" || key === "contractorId" || key === "employeeId" || key === "programId" || key === "clinicId" || key === "segId" || key === "sourceId") {
          return <span className="num font-medium">{lookupName(raw, key)}</span>;
        }
        if (key === "agents" || key === "approvedActivities" || key === "dependencies") {
          return <span className="line-clamp-1">{val}</span>;
        }
        const numeric = Number(val);
        const isNumericLike = val !== "" && Number.isFinite(numeric) && /^[0-9.,\s-]+$/.test(val);
        return <span className={isNumericLike ? "num" : ""}>{val}</span>;
      },
    }));
    return [...(baseCols.length && screen.entity !== "none" ? [sel] : []), ...defs];
  }, [visible, baseCols, t, screen.entity, fill]);

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
    globalFilterFn: "includesString",
  });

  const exportCsv = () => {
    const head = visible.join(",");
    const body = filtered
      .slice(0, 500)
      .map((r) =>
        visible
          .map((c) => `"${cellValue(r, c).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
    const blob = new Blob([head + "\n" + body], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${screen.path.replace(/\//g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success(t("action.export"), t("report.generated"));
  };

  if (!filtered.length) {
    return (
      <EmptyState
        title={t("table.noResults")}
        description={t("table.noResultsHint")}
        icon={<Search className="h-5 w-5" />}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute inset-y-0 start-2.5 my-auto h-4 w-4 text-muted-foreground" />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={t("table.searchRecords")}
            className="ps-8"
            aria-label={t("action.search")}
          />
        </div>

        {statusCol && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[170px]" aria-label={t("table.allStatuses")}>
              <SelectValue placeholder={t("table.allStatuses")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("table.allStatuses")}</SelectItem>
              {statusValues(rows, statusCol).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {projectFilter !== "all" && (
          <ToneBadge tone="info">
            {projects.find((p) => p.id === projectFilter)?.name ?? projectFilter}
          </ToneBadge>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns3 className="h-3.5 w-3.5" />
              {t("table.columns")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>{t("table.columns")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {baseCols.map((c) => (
              <DropdownMenuCheckboxItem
                key={c}
                checked={visible.includes(c)}
                onCheckedChange={(v) =>
                  setVisible((prev) => (v ? [...prev, c] : prev.filter((x) => x !== c)))
                }
              >
                {humanize(c)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {can(role, "export.records") && (
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="h-3.5 w-3.5" />
            {t("action.exportCsv")}
          </Button>
        )}

        {selected.size > 0 && (
          <Badge variant="accent">
            {selected.size} {t("action.bulk")}
          </Badge>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className={fill ? "overflow-hidden" : "overflow-x-auto"}>
          <Table className={fill ? "table-fixed" : ""} scrollable={!fill}>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-muted/70 hover:bg-muted/70">
                  {hg.headers.map((h) => (
                    <TableHead
                      key={h.id}
                      className={cn(
                        "h-10 text-[11.5px] font-bold uppercase tracking-wide text-muted-foreground",
                        fill && "h-auto whitespace-normal break-words px-2 py-2.5 leading-tight"
                      )}
                      onClick={h.column.getToggleSortingHandler()}
                      style={{
                        cursor: h.column.getCanSort() ? "pointer" : "default",
                        width: fill ? fillWidth(h.column.id) : undefined,
                      }}
                    >
                      <span
                        className={cn(
                          "inline-flex items-center gap-1",
                          fill && "block max-w-full"
                        )}
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {h.column.getIsSorted() === "asc" && <ArrowUp className="h-3 w-3 shrink-0" />}
                        {h.column.getIsSorted() === "desc" && <ArrowDown className="h-3 w-3 shrink-0" />}
                      </span>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "cursor-pointer even:bg-muted/25",
                    row.getIsSelected() && "bg-secondary/60"
                  )}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("input,button")) return;
                    onOpen?.(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn("py-2.5 text-[13px]", fill && "px-2 py-2 break-words align-top")}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-[12px] text-muted-foreground">
          <span>
            {t("table.showing")} {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            {t("table.of")} {table.getFilteredRowModel().rows.length} {t("table.records")}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label={t("table.first")}
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </Button>
            <span className="px-2">
              {table.getState().pagination.pageIndex + 1} / {Math.max(1, table.getPageCount())}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label={t("table.last")}
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function inferColumns(rows: Row[]): string[] {
  if (!rows.length) return [];
  const keys = Object.keys(rows[0]);
  return keys.filter((k) => !k.startsWith("_")).slice(0, 8);
}

/** Fixed widths for predictable narrow columns; every other column shares the remainder. */
const FILL_WIDTHS: Record<string, number> = {
  __sel: 44,
  id: 88,
  date: 92,
  time: 68,
  severity: 92,
  status: 92,
};

function fillWidth(key: string): number | undefined {
  return FILL_WIDTHS[key];
}

export function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function lookupName(row: Row, key: string): string {
  const v = row[key];
  if (typeof v !== "string") return String(v ?? "");
  const names: Record<string, string[]> = {
    projectId: ["projects", "name"],
    contractorId: ["contractors", "name"],
    employeeId: ["employees", "name"],
    programId: ["programs", "name"],
    clinicId: ["clinics", "name"],
    instructorId: ["instructors", "name"],
  };
  const ref = names[key];
  if (ref) {
    const store = useAppStore.getState().data as unknown as Record<string, Record<string, unknown>[]>;
    const found = store[ref[0]]?.find((x) => x.id === v);
    if (found) return String(found[ref[1]] ?? v);
  }
  return v;
}
