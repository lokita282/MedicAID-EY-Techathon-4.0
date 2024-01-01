import React from "react";

import { format, formatDistance, formatRelative, subDays } from "date-fns";
import de from "date-fns/locale/de";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DatePick = ({ start, end, setEnd, setStart, fsetStart, fsetEnd }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <DemoContainer
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginTop: -1,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
          components={["DateTimePicker", "DateTimePicker"]}>
          <DateTimePicker
            sx={{ width: "48%" }}
            label="Start time"
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
              // const formattedDate =
              //   dayjs(newValue).format("YYYY/MM/DD/ HH:mm");
              // setStart(newValue.toString());
              const result = format(newValue, "yyyy/MM/dd HH:mm");
              // setStart(result.toString());
              console.log(result.toString());
              fsetStart(result.toString());
            }}
          />
          <DateTimePicker
            sx={{ width: "48%" }}
            label="End time"
            value={end}
            onChange={(newValue) => {
              setEnd(newValue);
              // const formattedDate =
              //   dayjs(newValue).format("YYYY/MM/DD/ HH:mm");
              const result = format(newValue, "yyyy/MM/dd HH:mm");
              // setEnd(result.toString());
              console.log(result.toString());
              fsetEnd(result.toString());
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default DatePick;
