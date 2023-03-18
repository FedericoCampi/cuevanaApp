import React, { useContext } from 'react'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { ContextApi } from '../../context';

const MoviesServers = () => {

    const {trailerYoutube, linksMovie, datosMovie} = useContext(ContextApi);

    const [open, setOpen] = React.useState(false);
    const [openServ, setOpenServ] = React.useState(false);
    const anchorRef = React.useRef(null);
    const anchorRefServ = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedIndexServer, setSelectedIndexServer] = React.useState(0);
    const [serverSelected , setServerSelected] = React.useState(0);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setSelectedIndexServer(0);
        setOpen(false);
        setServerSelected(index)
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    }
    const handleMenuItemClickServ = (event, index) => {
        setSelectedIndexServer(index);
        setOpenServ(false);
    };
    const handleToggleServ = () => {
        setOpenServ((prevOpen) => !prevOpen);
    };
    const handleCloseServ = (event) => {
        if (anchorRefServ.current && anchorRefServ.current.contains(event.target)) {
            return;
        }
        setOpenServ(false);
    }
    const optionSub = () => {
        return(
            <>
            <Button
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingLeft: '5%',
                gap: '10px',
            }}
            >
                <ReactCountryFlag countryCode="US" 
                svg
                style={{
                    width: '2em',
                    height: '2em',
                }}
                />
                <h5
                className='serversNames'
                style={{
                    marginBottom: '0',
                    color: '#ffffff'
                }}
                >Subtitulado</h5>
            </Button>
            </> 
        )
    }
    const optionSpanish = () => {
        return(
            <Button
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingLeft: '5%',
                gap: '10px',
            }}
            >
                <ReactCountryFlag countryCode="MX" 
                    svg
                    style={{
                        width: '2em',
                        height: '2em',
                    }}
                />
                <h5
                    className='serversNames'
                    style={{
                        marginBottom: '0',
                        color: '#ffffff'
                    }}
                >Español</h5>
            </Button>
        )
    }
    const optionTrailer = () => {
        return(
            <Button 
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingLeft: '5%',
                gap: '10px',
            }}
            >
                <OndemandVideoIcon
                />
                <h5
                className='serversNames'
                style={{
                    marginBottom: '0',
                    color: '#ffffff'
                }}
                >Trailer</h5>
            </Button>
        )
    }
    
    const optionServer1 = () => {
    
        const languages = ['#1 - SUBTITULADO', '#1 - LATINO', 'TRAILER']
    
        return(
            <>
            <Button
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingLeft: '5%',
                gap: '10px',
            }}
            >
                <h5
                className='serversNames'
                style={{
                    marginBottom: '0',
                    color: '#ffffff'
                }}
                >{languages[serverSelected]} - HD</h5>
            </Button>
            </> 
        )
    }
    const optionServer2 = () => {

        const languages = ['#2 - SUBTITULADO', '#2 - LATINO', 'TRAILER']

        return(
            <>
            <Button
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingLeft: '5%',
                gap: '10px',
            }}
            >
                    <h5
                    className='serversNames'
                    style={{
                        marginBottom: '0',
                        color: '#ffffff'
                    }}
                    >{languages[serverSelected]} - HD</h5>
            </Button>
            </> 
        )
    }
    const optionServer3 = () => {

        const languages = ['#3 - SUBTITULADO', '#3 - LATINO', 'TRAILER']

        return(
            <>
            <Button
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                paddingLeft: '5%',
                gap: '10px',
            }}
            >
                    <h5
                    className='serversNames'
                    style={{
                        marginBottom: '0',
                        color: '#ffffff'
                    }}
                    >{languages[serverSelected]} - HD</h5>
            </Button>
            </> 
        )
    }
    const options = [optionSub(),optionSpanish(), optionTrailer()]
    const optionsServers = [optionServer1(),optionServer2(), optionServer3()]
    const idTrailer = 'https://www.youtube-nocookie.com/embed/' + trailerYoutube[0].videoId
    
return (
    <div className='PageMovie_movieContainer'>
            <div className='PageMovie_servers'>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" className='PageMovie_serversOptions0'onClick={handleToggle}>
                    {options[selectedIndex]}
                    <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                className='PageMovie_popper'
                sx={{
                zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                    transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                >
                    <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                        {options.map((option, index) => (
                            <MenuItem
                            key={index}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                            >
                            {option}
                            </MenuItem>
                        ))}
                        </MenuList>
                    </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
            <ButtonGroup variant="contained" ref={anchorRefServ} aria-label="split button" className='PageMovie_serversOptions1'onClick={handleToggleServ}>
                    {optionsServers[selectedIndexServer]}
                    {selectedIndex !== 2 ?
                    <Button
                        size="small"
                        aria-controls={openServ ? 'split-button-menu' : undefined}
                        aria-expanded={openServ ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        >
                        <ArrowDropDownIcon />
                    </Button>
                    : null }
                </ButtonGroup>
                {selectedIndex !== 2 ? 
                    <Popper
                    className='PageMovie_popper'
                    sx={{
                    zIndex: 1,
                    }}
                    open={openServ}
                    anchorEl={anchorRefServ.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={handleCloseServ}>
                            <MenuList id="split-button-menu" autoFocusItem>
                            {optionsServers.map((option, index) => (
                                <MenuItem
                                key={index}
                                selected={index === selectedIndexServer}
                                onClick={(event) => handleMenuItemClickServ(event, index)}
                                >
                                {option}
                                </MenuItem>
                            ))}
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
            : null} 
            </div>
            <div className='PageMovie_movie'>
                {selectedIndex === 0 ?
                    <iframe src={linksMovie[0].sub.length > 1 ? linksMovie[0].sub[selectedIndexServer].url : idTrailer} title={datosMovie.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
                : selectedIndex === 1 ?
                    <iframe src={linksMovie[0].latino.length > 1 ? linksMovie[0].latino[selectedIndexServer].url : idTrailer} title={datosMovie.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
                :
                <iframe src={idTrailer} title={datosMovie.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
                }
            </div>
        </div>
)
}

export default MoviesServers