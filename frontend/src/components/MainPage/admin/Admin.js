import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './ListItems';
import Orders from './Orders';
import { GlobalState } from '../../../GlobalState';
import { useContext, useState } from 'react';
// import CreateProduct from './createProduct/createProduct';
import Category from './category/Category';
import AdminProductsList from './products/AdminProductsList';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function Admin() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const state = useContext(GlobalState)
  const [history] = state.userAPI.history

  return (
    <div className="admin__container">
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" open={open} style={{zIndex: "99"}}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            // height: '100vh',
            // overflow: 'auto',
          }}
          className="admin__main"
        >
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
              <h2 className="page__header">Overview</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7} lg={8}>
                {/* <h2>Evarate</h2> */}
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                  // className="paper__container"
                >
                  <div>
                      <h2>Total Products Sold</h2>
                      <p className="overview__number">
                        {
                          history.reduce((prev, item) => prev + (
                            item.cart.reduce((prevItem, product) => (
                              prevItem + (product.sold)
                            ), 0)
                          ), 0)
                        }
                      </p>
                  </div>
                </Paper>
              </Grid>

              {/* Recent Deposits */}

              <Grid item xs={12} md={5} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                  <div>
                  <h2>Total Revenue</h2>
                  <p className="overview__number">
                   $ {
                        history.reduce((prev, item) => (
                          prev + (
                            item.cart.reduce((prevItem, product) => (
                              prevItem + (product.quantity * product.price)
                            ), 0)
                          )
                        ), 0)
                    }
                  </p>
                  </div>

                </Paper>
              </Grid>
              <div className="space__column"></div>
              {/*Orders */}

              <Grid item xs={12}>
                <h2 className="page__header">History</h2>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}} className="paper__container">
                  <Orders />
                </Paper>
              </Grid>

              <div className="space__column"></div>

                 {/* category */}

              <Grid item xs={12}>
                <h2 className="page__header">Category</h2>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}  className="paper__container">
                  <Category/>
                </Paper>
              </Grid>

              <div className="space__column"></div>

               {/* product list */}
               <AdminProductsList/>
              

            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </div>
  );
}

export default function Dashboard() {
  return <Admin />;
}