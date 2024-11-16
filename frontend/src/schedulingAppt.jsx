// import React, { useState, useEffect } from 'react';
// import {
//   Schedule,
// } from 'grommet-icons';
// import {
  
//   Box,
//   Button,
//   Form,
//   Text,
//   TextArea,
//   Grommet,
//   Calendar,
//   DropButton,
//   MaskedInput,
//   Keyboard,
//   Select
// } from 'grommet';
// import './App.css';

// const theme = {
//   global: {
//     colors: {
//       brand: '#000000',
//       focus: "#000000",
//       active: "#000000",
//     },
//     font: {
//       family: 'Lato',
//     },
//   },
// };

// let theDate, theTime, endTime, theConcerns, theSymptoms, theDoc;

// import Header from './components/header';

// const DropContent = ({ date: initialDate, time: initialTime, onClose }) => {
//   const [date, setDate] = useState();
//   const [time, setTime] = useState();

//   const close = () => {
//     theDate = date;
//     theTime = time;
//     const parsedTime = theTime.split(":");
//     const startHour = parseInt(parsedTime[0], 10);
//     endTime = `${startHour + 1}:00`;

//     onClose(date || initialDate, time || initialTime);
//   };

//   return (
//     <Box align="center">
//       <Calendar
//         animate={false}
//         date={date || initialDate}
//         onSelect={setDate}
//         showAdjacentDays={false}
//         required
//       />
//       <Box flex={false} pad="medium" gap="small">
//         <Keyboard
//           required
//           onEnter={event => {
//             event.preventDefault();
//             close();
//           }}
//         >
//           <MaskedInput
//             mask={[
//               { length: [1, 2], options: Array.from({ length: 24 }, (_, i) => i.toString()), placeholder: "hh" },
//               { fixed: ":" },
//               { length: 2, options: ["00"], placeholder: "mm" }
//             ]}
//             value={time || initialTime}
//             onChange={event => setTime(event.target.value)}
//             required
//           />
//         </Keyboard>
//         <Box flex={false}>
//           <Button label="Done" onClick={close} color="#00739D" />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// const DateTimeDropButton = () => {
//   const [date, setDate] = useState();
//   const [time, setTime] = useState("");
//   const [open, setOpen] = useState();

//   const onClose = (nextDate, nextTime) => {
//     setDate(nextDate);
//     setTime(nextTime);
//     setOpen(false);
//     setTimeout(() => setOpen(undefined), 1);
//   };

//   return (
//     <Grommet theme={theme}>
//       <Box align="center" pad="large">
//         <DropButton
//           open={open}
//           onClose={() => setOpen(false)}
//           onOpen={() => setOpen(true)}
//           dropContent={<DropContent date={date} time={time} onClose={onClose} />}
//         >
//           <Box direction="row" gap="small" align="center" pad="small">
//             <Text color={date ? undefined : "dark-5"}>
//               {date ? `${new Date(date).toLocaleDateString()} ${time}` : "Select date & time"}
//             </Text>
//             <Schedule />
//           </Box>
//         </DropButton>
//       </Box>
//     </Grommet>
//   );
// };

// const ConcernsTextArea = () => {
//   const [value, setValue] = useState("");

//   return (
//     <Grommet theme={theme}>
//       <Box width="medium" height="xsmall">
//         <TextArea
//           placeholder="Enter your concerns..."
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//             theConcerns = e.target.value;
//           }}
//           fill
//           required
//         />
//       </Box>
//     </Grommet>
//   );
// };

// const SymptomsTextArea = () => {
//   const [value, setValue] = useState("");

//   return (
//     <Grommet theme={theme}>
//       <Box width="medium" height="xsmall">
//         <TextArea
//           placeholder="Enter your symptoms..."
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//             theSymptoms = e.target.value;
//           }}
//           fill
//           required
//         />
//       </Box>
//     </Grommet>
//   );
// };

// const DoctorsDropdown = () => {
//   const [value, setValue] = useState();
//   const [doctorsList, setDoctorsList] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3001/docInfo")
//       .then(res => res.json())
//       .then(data => {
//         const list = data.data.map((doc) => `${doc.name} (${doc.email})`);
//         setDoctorsList(list);
//       });
//   }, []);

//   return (
//     <Select
//       options={doctorsList}
//       value={value}
//       placeholder="Select Doctor"
//       onChange={(e) => {
//         setValue(e.value);
//         theDoc = e.value.match(/\((.*)\)/)[1];
//       }}
//       fill
//       required
//     />
//   );
// };

// const SchedulingAppt = () => {
//   const handleSubmit = () => {
//     fetch("http://localhost:3001/userInSession")
//       .then(res => res.json())
//       .then(({ email }) => {
//         const checkApptUrl = `http://localhost:3001/checkIfApptExists?email=${email}&startTime=${theTime}&date=${theDate}&docEmail=${theDoc}`;
//         fetch(checkApptUrl)
//           .then(res => res.json())
//           .then(({ data }) => {
//             if (data[0]) {
//               alert("Appointment Clash! Try another doctor or date/time");
//             } else {
//               fetch("http://localhost:3001/genApptUID")
//                 .then(res => res.json())
//                 .then(({ id: gen_uid }) => {
//                   const scheduleUrl = `http://localhost:3001/schedule?time=${theTime}&endTime=${endTime}&date=${theDate}&concerns=${theConcerns}&symptoms=${theSymptoms}&id=${gen_uid}&doc=${theDoc}`;
//                   fetch(scheduleUrl).then(() => {
//                     const patientUrl = `http://localhost:3001/addToPatientSeeAppt?email=${email}&id=${gen_uid}&concerns=${theConcerns}&symptoms=${theSymptoms}`;
//                     fetch(patientUrl).then(() => {
//                       alert("Appointment successfully scheduled!");
//                     });
//                   });
//                 });
//             }
//           });
//       });
//   };

//   return (
//     <Grommet theme={theme} full>
//       <Header/>
//       <Box align="center" pad="small" gap="small">
//         <Form onSubmit={handleSubmit}>
//           <Box align="center" gap="small">
//             <DoctorsDropdown />
//           </Box>
//           <DateTimeDropButton />
//           <ConcernsTextArea />
//           <SymptomsTextArea />
//           <Box align="center" pad="small" gap="small">
//             <Button label="Attempt To Schedule" type="submit" primary />
//           </Box>
//         </Form>
//       </Box>
//     </Grommet>
//   );
// };

// export default SchedulingAppt;
import React, { useState, useEffect } from 'react';
import { Schedule } from '@mui/icons-material';
import { Button, Box, TextField, MenuItem, Select, Typography, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment } from '@mui/material';
import './App.css';

let theDate, theTime, endTime, theConcerns, theSymptoms, theDoc;

import Header from './components/header';

// DialogContent for date/time selection
const DateTimeDialogContent = ({ open, onClose, onSave, date: initialDate, time: initialTime }) => {
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  const handleSave = () => {
    theDate = date;
    theTime = time;
    const parsedTime = theTime.split(":");
    const startHour = parseInt(parsedTime[0], 10);
    endTime = `${startHour + 1}:00`;
    onSave(date, time);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Date and Time</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginBottom: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Dropdown for selecting doctor
const DoctorsDropdown = () => {
  const [value, setValue] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/docInfo")
      .then(res => res.json())
      .then(data => {
        const list = data.data.map((doc) => `${doc.name} (${doc.email})`);
        setDoctorsList(list);
      });
  }, []);

  return (
    <Select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        theDoc = e.target.value.match(/\((.*)\)/)[1];
      }}
      fullWidth
      displayEmpty
      sx={{
        marginBottom: 2,
        '& .MuiSelect-root': {
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }
      }}
    >
      <MenuItem value="" disabled>Select Doctor</MenuItem>
      {doctorsList.map((doc, index) => (
        <MenuItem key={index} value={doc}>{doc}</MenuItem>
      ))}
    </Select>
  );
};

// Text field for concerns
const ConcernsTextField = () => {
  const [value, setValue] = useState("");

  return (
    <TextField
      label="Enter your concerns"
      multiline
      // rows={4}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        theConcerns = e.target.value;
      }}
      fullWidth
      variant="outlined"
      sx={{ marginBottom: 2, borderRadius: 2 }}
    />
  );
};

// Text field for symptoms
const SymptomsTextField = () => {
  const [value, setValue] = useState("");

  return (
    <TextField
      label="Enter your symptoms"
      multiline
      // rows={4}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        theSymptoms = e.target.value;
      }}
      fullWidth
      variant="outlined"
      sx={{ marginBottom: 2, borderRadius: 2 }}
    />
  );
};

// Main Appointment Scheduling Component
const SchedulingAppt = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  const handleDialogClose = () => setOpenDialog(false);
  const handleDialogOpen = () => setOpenDialog(true);

  const handleSubmit = () => {
        fetch("http://localhost:3001/userInSession")
          .then(res => res.json())
          .then(({ email }) => {
            const checkApptUrl = `http://localhost:3001/checkIfApptExists?email=${email}&startTime=${theTime}&date=${theDate}&docEmail=${theDoc}`;
            fetch(checkApptUrl)
              .then(res => res.json())
              .then(({ data }) => {
                if (data[0]) {
                  alert("Appointment Clash! Try another doctor or date/time");
                } else {
                  fetch("http://localhost:3001/genApptUID")
                    .then(res => res.json())
                    .then(({ id: gen_uid }) => {
                      const scheduleUrl = `http://localhost:3001/schedule?time=${theTime}&endTime=${endTime}&date=${theDate}&concerns=${theConcerns}&symptoms=${theSymptoms}&id=${gen_uid}&doc=${theDoc}`;
                      fetch(scheduleUrl).then(() => {
                        const patientUrl = `http://localhost:3001/addToPatientSeeAppt?email=${email}&id=${gen_uid}&concerns=${theConcerns}&symptoms=${theSymptoms}`;
                        fetch(patientUrl).then(() => {
                          alert("Appointment successfully scheduled!");
                        });
                      });
                    });
                }
              });
          });
      };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // padding={3}
      sx={{
        backgroundColor: '#f4f4f9',
        borderRadius: 3,
        boxShadow: 2,
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <Header />
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 3 }}>
        Schedule an Appointment
      </Typography>
      
      <DoctorsDropdown />
      
      <Button
        variant="outlined"
        color="primary"
        onClick={handleDialogOpen}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        {date ? `${new Date(date).toLocaleDateString()} ${time}` : "Select Date & Time"}
        <Schedule sx={{ marginLeft: 1 }} />
      </Button>
      
      <ConcernsTextField />
      <SymptomsTextField />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          borderRadius: 2,
          padding: '10px 20px',
          marginTop: 3,
          fontWeight: 'bold',
        }}
      >
        Book Appointment
      </Button>

      <DateTimeDialogContent
        open={openDialog}
        onClose={handleDialogClose}
        onSave={(date, time) => {
          setDate(date);
          setTime(time);
          setOpenDialog(false);
        }}
        date={date}
        time={time}
      />
    </Box>
  );
};

export default SchedulingAppt;
