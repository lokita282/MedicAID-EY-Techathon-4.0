import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: 'orange',
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
          },
          '&.Mui-focused': {
            backgroundColor: '#00603F',
            color: '#00603F',
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          '&$focused': {
            color: '#00603F',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
          '&$focused': {
            color: '#00603F',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderColor: 'orange',
          backgroundColor: alpha(theme.palette.grey[500], 0.12),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          // '&$focused': {
          //   color: '#00603F',
          // },
        },
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.grey[500], 0.32),
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
          '&$focused': {
            color: '#00603F',
          },
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#00603F',
          fontWeight: 'bold',
        },
      },

      focused: {},
    },
  }
}
