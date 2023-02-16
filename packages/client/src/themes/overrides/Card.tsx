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
          padding: 12,
          '&:last-child': {
            paddingBottom: 20
          }
        }
      }
    }
  }
}