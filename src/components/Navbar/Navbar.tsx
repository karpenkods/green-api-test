import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import GitHubIcon from '@mui/icons-material/GitHub'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { grey } from '@mui/material/colors'

import ukImage from '../../assets/uk.png'
import ruImage from '../../assets/ru.png'
import '../../assets/fonts/fonts.scss'
import {
  AppBar,
  CostumButton,
  Drawer,
  DrawerHeader,
  openCreateChatReducer,
  openMenuReducer,
  pathNameReducer,
  showLogoReducer,
  showMenuReducer,
  themeReducer,
  useAppDispatch,
  useAppSelector,
} from '../../common'

export const Navbar: FC = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const openMenu = useAppSelector((store) => store.menu.openMenu)
  const showMenu = useAppSelector((store) => store.menu.showMenu)
  const showLogo = useAppSelector((store) => store.menu.showLogo)
  const darkTheme = useAppSelector((store) => store.theme.theme) === 'dark'
  const username = useAppSelector((store) => store.chat.username)
  const color = darkTheme ? grey[100] : grey[800]

  const theme = useTheme()
  const isSmallMobile = useMediaQuery(theme.breakpoints.down(400))
  const isMobile = useMediaQuery(theme.breakpoints.down(768))
  const isTablet = useMediaQuery(theme.breakpoints.down(970))

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  const handleDrawerShow = () => {
    dispatch(showMenuReducer(!showMenu))
  }

  const handleDrawerOpen = () => {
    dispatch(openMenuReducer(!openMenu))
    if (!isMobile) return
    dispatch(showLogoReducer(!showLogo))
  }

  return (
    <Stack direction="row">
      <AppBar position="fixed" open={openMenu} color="inherit">
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {!isSmallMobile && showLogo && (
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              fontFamily="marckScript !important"
              sx={{
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              color="success"
              onClick={() =>
                window.open(
                  'https://green-api.com/',
                  '_blank',
                  'noopener,noreferrer',
                )
              }
            >
              GREEN-API
            </Typography>
          )}
          {!isTablet &&
            (username ? (
              <Stack direction="row" gap="8px" alignItems="center">
                <Typography variant="body1" fontSize="18px">
                  {t('chatWithUser')}
                </Typography>
                <Typography
                  variant="h4"
                  color="primary"
                  fontFamily="marckScript !important"
                >
                  {username}
                </Typography>
              </Stack>
            ) : (
              <Stack>
                <Typography
                  variant="h4"
                  color="tomato"
                  alignSelf="center"
                  fontFamily="marckScript !important"
                  pt="8px"
                  component="h1"
                >
                  {t('title')}
                </Typography>
                <Typography
                  variant="h5"
                  color="primary"
                  alignSelf="center"
                  fontFamily="marckScript !important"
                  pb="8px"
                >
                  {t('title2')}
                </Typography>
              </Stack>
            ))}
          <Stack
            width={isSmallMobile ? '100%' : 'auto'}
            direction="row"
            justifyContent={isSmallMobile ? 'flex-end' : 'space-between'}
            alignItems="center"
          >
            <CostumButton
              variant="contained"
              color="error"
              onClick={() => {
                navigate('/create-chat')
                dispatch(openCreateChatReducer(true))
                dispatch(pathNameReducer('/home'))
              }}
            >
              {t('createChat')}
            </CostumButton>
            <IconButton
              onClick={handleDrawerShow}
              sx={{
                margin: '8px 0px 8px 15px',
                ...(openMenu && { display: 'none' }),
              }}
            >
              {showMenu ? (
                <CloseIcon sx={{ width: '30px', height: '30px' }} />
              ) : (
                <MenuIcon sx={{ width: '30px', height: '30px' }} />
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      {(showMenu || openMenu) && (
        <Drawer variant="permanent" anchor="right" open={openMenu}>
          <DrawerHeader>
            <CostumButton
              sx={{
                margin: '24px 0 0 -6px',
                pb: '32px',
                color: color,
                fontSize: 18,
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  backgroundColor: 'transparent',
                  opacity: 0.8,
                },
              }}
              onClick={() => {
                handleDrawerOpen()
                handleDrawerShow()
              }}
            >
              <CloseIcon sx={{ marginRight: '10px' }} />
              {t('close')}
            </CostumButton>
          </DrawerHeader>
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() =>
                  changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
                }
                sx={{
                  minHeight: 48,
                  justifyContent: openMenu ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openMenu ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={i18n.language === 'ru' ? ukImage : ruImage}
                    width={40}
                    height={25}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: openMenu ? 1 : 0,
                    color: color,
                  }}
                >
                  {t('language')}
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() =>
                  dispatch(themeReducer(darkTheme ? 'light' : 'dark'))
                }
                sx={{
                  minHeight: 48,
                  justifyContent: openMenu ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openMenu ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {darkTheme ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: openMenu ? 1 : 0,
                    color: color,
                  }}
                >
                  {darkTheme ? `${t('lightTheme')}` : `${t('darkTheme')}`}
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link
                href="https://github.com/karpenkods?tab=repositories"
                sx={{ textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openMenu ? 'initial' : 'center',
                    px: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openMenu ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <GitHubIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      opacity: openMenu ? 1 : 0,
                      color: color,
                    }}
                  >
                    {t('git')}
                  </ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleDrawerOpen}
                sx={{
                  minHeight: 48,
                  justifyContent: openMenu ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openMenu ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {openMenu ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: openMenu ? 1 : 0,
                    color: color,
                  }}
                >
                  {t('hideMenu')}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}
    </Stack>
  )
}
