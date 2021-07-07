import React          from 'react';
import { makeStyles } from '@material-ui/core';
import Card           from '@material-ui/core/Card';
import CardHeader     from '@material-ui/core/CardHeader';
import CardContent    from '@material-ui/core/CardContent';
import IconButton     from '@material-ui/core/IconButton';
import Typography     from '@material-ui/core/Typography';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import Avatar         from '@material-ui/core/Avatar'


function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const useStyles = makeStyles((theme, props) => ({
  cardHeader: {
    '& .MuiCardHeader-title': {
      marginBottom: 5,
      color: theme.palette.blue.main,
      fontFamily: 'Montserrat',
      fontSize: 26,
      WebkitTextStrokeWidth: '0.5px', // Gotcha: webkit names use Pascal case.
      WebkitTextStrokeColor: '#333',
      textShadow: '0px 1px 1px rgba(0,0,0,0.25)'
    },
    '& .MuiCardHeader-subheader': {
      color: theme.palette.gray.light,
      fontFamily: 'Montserrat',
      fontSize: 18,
      WebkitTextStrokeWidth: '0.5px',
      WebkitTextStrokeColor: '#333',
      textShadow: '0px 1px 1px rgba(0,0,0,0.25)'
    }
  },

  avatar: {
    fontFamily: 'Montserrat',
    border: '1px solid rgba(0,0,0,0.25)',
    backgroundColor: ({ note }) => {
      if (note.category === 'work'){  return theme.palette.pink.main;   }
      if (note.category === 'money'){ return theme.palette.green.main;  }
      if (note.category === 'todos'){ return theme.palette.orange.main; }
      return theme.palette.blue.main;
    },
    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'
  }
}));


/* =======================================================================

======================================================================= */
 

function NoteCard({ note, handleDelete }){
  const styleProps = { note };
  const classes    = useStyles(styleProps);

  return (
    <React.Fragment>
      <Card className="border border-gray" elevation={2}>
        <CardHeader
          classes={{ root: classes.cardHeader }}
          avatar={ <Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar> }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={capitalize(note.category)}
        />

        <CardContent>
          <Typography className="text-gray" variant="body1">{ note.details }</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}


export default NoteCard;