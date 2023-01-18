export default function MuiCard () {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          // borderRadius: 20,
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          '&:last-child': {
            paddingBottom: 20
          }
        }
      }
    }
  }
}