import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { langMap } from './inputData/inputContant';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ActiveBonus from '../components/reuse/Activebonus';
import Header from './reuse/header';
import './promo.scss';
import icon from '../Icon.png';
import Sidebar from './reuse/sidebar';
import Footer from './reuse/footer';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& > *': {
            // margin: theme.spacing(1),
            // width: '25ch',
        },
    },
    papernew: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        // margin: 'auto',
        maxWidth: 500,
    },
}));

const PromoCode: any = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    // eslint-disable-next-line
    const [copied, setCopied] = React.useState(false);

    useEffect(() => {
        setSearchResults(langMap);
    }, []);

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
        const results = langMap.filter(person =>
            person.Name.toLowerCase().includes(event.target.value)
        );
        setSearchResults(results);
        if (!event.target.value) {
            setSearchResults(langMap);
        }
    }

    const handlereset = () => {
        setSearchResults(langMap);
        setSearchTerm('');
    }

    return (
        <>
            <Sidebar />
            <div className="body_main">

                <Header />

                <div className='body_section'>
                    <h1 className='body_header'>Services</h1>
                    <label id="outlined-basic" className='lbl_filter'>FILTER</label>
                    <TextField className='input_search' id="outlined-basic" label="Search" variant="outlined" value={searchTerm} onChange={(e: any) => handleSearch(e)} />
                    <Button className='btn_reset' variant="contained" onClick={() => handlereset()}>
                        Reset
                </Button>
                    {searchResults && searchResults.map((data: any) => <div className={classes.papernew}>
                        <Paper className="main_wrapper">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm container className="section_first">
                                    <Grid item xs container direction="column" spacing={2} className="subsection_first">
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" className='nameFirst'>
                                                {data.Name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" className='desc_para' style={{ cursor: 'pointer' }}>
                                                {data.Description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item className="promocode_sect">
                                        <Typography className="promo">PROMOCODE</Typography>
                                        <Grid item className="bonus_sect">
                                            <div className="it_promo">
                                                {data.PromoCode}
                                                <span><CopyToClipboard text={data.PromoCode}
                                                    onCopy={() => setCopied(true)}>
                                                    <img src={icon} alt="" />
                                                </CopyToClipboard></span>
                                            </div>
                                            <ActiveBonus />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>)} 
                    <Footer /> 
                </div>
            </div>
        </>
    );
};

export default PromoCode;
