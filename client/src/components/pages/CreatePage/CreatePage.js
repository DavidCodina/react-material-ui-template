import React, { useState, useEffect, useCallback, useRef }    from 'react';
import { useHistory }         from 'react-router-dom'
import { makeStyles }         from '@material-ui/core';
import Typography             from '@material-ui/core/Typography';
import Divider                from '@material-ui/core/Divider';
import Box                    from '@material-ui/core/Box';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SendIcon               from '@material-ui/icons/Send';    // eslint-disable-line
import ThumbUpIcon            from '@material-ui/icons/ThumbUp'; // eslint-disable-line
import { CustomButton }       from '../../shared';
import TextField              from '@material-ui/core/TextField'; // eslint-disable-line
import Radio                  from '@material-ui/core/Radio';
import RadioGroup             from '@material-ui/core/RadioGroup';
import FormControlLabel       from '@material-ui/core/FormControlLabel';
import FormControl            from '@material-ui/core/FormControl';
import FormLabel              from '@material-ui/core/FormLabel';
import FormHelperText         from '@material-ui/core/FormHelperText';


const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: 25,
    '& label.Mui-focused': {
      color: theme.palette.blue.main, 
    },
    // It's necessary to reset the error styles for focus events.
    '& label.Mui-focused.Mui-error': {
      color: theme.palette.red.main,
    },

    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFF',
      '& fieldset': {
        // borderColor: ..., // Will set color of 'input border'
      },
      '&:hover fieldset': {
        borderColor: theme.palette.blue.main
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.blue.main
      },      
      // It's necessary to reset the error styles for focus events.
      '&.Mui-focused.Mui-error fieldset': {
        borderColor: theme.palette.red.main,
      },
      '&.Mui-error:hover fieldset': {
        borderColor: theme.palette.red.main,
      }
    },
    '& .MuiFormHelperText-root': {
      textAlign: 'right'
    }
  },

  radioGroupLabel: {
    '&.Mui-focused': {
      color: theme.palette.blue.main,
      fontWeight: 'bold'
    }
  },

  radioLabel: {
    '& .MuiIconButton-root.Mui-checked': {
      '& .MuiSvgIcon-root:first-of-type': {
        color: 'rgba(0,0,0,0.54)' // Default
      },

      '& .MuiSvgIcon-root:last-of-type': {
        color: theme.palette.blue.main
      },

      '& .MuiTouchRipple-root': {
        color: theme.palette.blue.main
      }  
    },
    '& .MuiIconButton-root:hover': {
      backgroundColor:'rgba(33, 133, 208, 0.1)'
    }
  }
}));


/* =======================================================================

======================================================================= */


export function CreatePage(props){
  const classes                          = useStyles();
  const history                          = useHistory();

  const [title,        setTitle]         = useState('');
  const [details,      setDetails]       = useState('');
  const [category,     setCategory]      = useState(''); 

  const [titleError,   setTitleError]     = useState('');
  const [detailsError, setDetailsError]   = useState('');
  const [categoryError, setCategoryError] = useState('');

  const shouldValidate  = useRef(false); // used when validation functions are invoked inside of a useEffect.
  const categoryRef     = useRef();


  /* ==========================
      Validation Functions
  ========================== */
  // The actual validation checks are built into the validation functions.
  // However, in a production application I would have validation helpers
  // in a separate file. These could be made from scratch or use a third-party
  // validation library.


  const titleIsValid = (e) => {
    // When triggered by onBlur or onInput there will be an e.target.
    if (e && e.target){
      if (e.target.value === ''){
        setTitleError('Title is required!');
        return false;
      } 
      setTitleError('');
      return true; 
    }

    // When triggered by onSubmit, there will NOT be an e.target.
    if (title === ''){ 
      setTitleError('Title is required!');
      return false;
    } 
    setTitleError('');
    return true; 
  };


  const detailsIsValid = (e) => {
    // When triggered by onBlur or onInput there will be an e.target.
    if (e && e.target){
      if (e.target.value === ''){
        setDetailsError('Details is required!');
        return false;
      } 
      setDetailsError('');
      return true; 
    }

    // When triggered by onSubmit, there will NOT be an e.target.
    if (details === ''){
      setDetailsError('Details is required!'); 
      return false;      
    } 
    setDetailsError(''); 
    return true;
  };


  // Must be wrapped in a useCallback because it's being run inside useEffect.
  const categoryIsValid = useCallback(() => {
    if (category === ''){
      setCategoryError('You must select a category!'); 
      // There seems to be no good way to target the elements inside of the radio group
      // When there is an error. The following approach is a useful hack.
      categoryRef.current.classList.add('color-all-children-red');
      return false;      
    } 

    setCategoryError(''); 
    categoryRef.current.classList.remove('color-all-children-red');
    return true;
  }, [category]);


  /* ==========================

  ========================== */


  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid  = true;
    const validators = [titleIsValid, detailsIsValid, categoryIsValid];
    
    validators.forEach(validator => {
      const isValid = validator();
      if (!isValid){ formIsValid = false; }
    });
  
    if (formIsValid){ 
      console.log('%c The form is valid! ', 'background: rgba(50,205,50,0.15); color:rgb(50,205,50); font-weight:bold');


      fetch('http://localhost:5000/notes', {
        method:  'POST',
        headers: { "Content-type": "application/json" },
        body:    JSON.stringify({ title, details, category })
      })
      .then(() => {
        history.push('/notes');
        // Reset the form
        shouldValidate.current = false;
        setTitle('');
        setDetails('');
        setCategory('');
      })
      .catch(err => console.error(err));
    } 

    else { console.log('%c The form is NOT valid! ', 'background: rgba(255,53,94,0.15); color:rgb(255,53,94); font-weight:bold'); }
  }


  /* ==========================

  ========================== */


  useEffect(() => {
    // use shouldValidate to avoid calling categoryIsValid() on first mount.
    // and after resetting form on success (shouldValidate is essentially like a hasMounted flag).
    if (shouldValidate.current === false){ shouldValidate.current = true; } 
    else { categoryIsValid(); }
  }, [category, categoryIsValid]);


  return (
    <React.Fragment>
      <Typography className="text-3d" style={{ margin: '0 auto 25px auto', fontWeight: 600 }}  variant="h3" component="h1" align="center" my={3}>Create A Note</Typography>


      <Divider style={{ margin: '25px auto 50px auto', height: 2, borderRadius: '50%' }} />

  
      <Box component="form" p={3} className=" bg-light border border-gray border-2 rounded-3 shadow-sm" style={{ margin: '0 auto 50px auto', maxWidth: 600 }} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          classes={{ root: classes.textField }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={titleIsValid}
          onInput={titleIsValid} 
          label="Note Title" 
          variant="outlined" 
          size="small"
          color="secondary" 
          fullWidth
          
          required                      // Will add a * in the UI
          error={titleError.length > 0} // Must be a Boolean
          helperText={titleError}
        />

        <TextField 
          classes={{ root: classes.textField }}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          onBlur={detailsIsValid}
          onInput={detailsIsValid}
          label="Details"
          variant="outlined"
          size="small"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError.length > 0} // Must be a Boolean
          helperText={detailsError}
        />


        <FormControl className={classes.field} error={categoryError.length > 0}>
          <FormLabel classes={{ root: classes.radioGroupLabel }} >Note Category:</FormLabel>

          {/* There's no need for a blur handler here. Instead categoryIsValid() is called in a useEffect. */}
          <RadioGroup ref={categoryRef} value={category} onChange={(e) => {
            setCategory(e.target.value);
          }}>
            <FormControlLabel classes={{ root: classes.radioLabel }} value="money"     control={<Radio />} label="Money" />
            <FormControlLabel classes={{ root: classes.radioLabel }} value="todos"     control={<Radio />} label="Todos" />
            <FormControlLabel classes={{ root: classes.radioLabel }} value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel classes={{ root: classes.radioLabel }} value="work"      control={<Radio />} label="Work" />
          </RadioGroup>
          <FormHelperText>{categoryError}</FormHelperText>
        </FormControl>
        

        <CustomButton
          className="mt-3 font-montserrat"
          style={{ transform: 'scale(1)', width: '100%' }}
          type="submit" 
          color="blue" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >Submit</CustomButton>
      </Box>
    </React.Fragment>     
  );
}



