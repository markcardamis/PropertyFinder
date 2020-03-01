import { makeStyles } from '@material-ui/core/styles';

export const style = makeStyles({
    appbar: {
        backgroundColor: '#0288d1',
        borderRadius: '0 0 20px 20px',
      },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '15px 0 15px 0'
    },
    title: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
    },
    button: {
        color: '#FFFFFF',
        maxWidth: '100px',
        outline: 'none',

        '&:hover': { 
            color: '#FFFFFF',
            textDecoration: 'none'
        },
   
    }
   
  });