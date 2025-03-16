import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format, subDays } from "date-fns"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const ReportFilters = () => {

  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const [reportType, setReportType] = useState("revenue")
  const [groupBy, setGroupBy] = useState("movie")

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange(range)
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="tickets">Tickets Sold</SelectItem>
                <SelectItem value="occupancy">Seat Occupancy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Group By</label>
            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Group By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="movie">Movie</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="screen">Screen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button>Generate Report</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReportFilters