import { AppBar, Button, Stack, Toolbar } from '@mui/material';
import { type FormEvent, useRef } from 'react';
import { setQuery } from '@/state/querySlice';
import { useAppDispatch } from '@/state/store';
import { SearchInput } from '../SearchInput';
import classes from './AppHeader.module.scss';

/** Contains the app bar with the search field */
export function AppHeader() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    dispatch(setQuery(searchInputRef.current?.value ?? ''));
  }

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar className={classes.AppHeader_Toolbar}>
        <Stack
          component="form"
          className={classes.AppHeader_Form}
          direction="row"
          spacing={1}
          onSubmit={handleSubmit}
        >
          <SearchInput
            ref={searchInputRef}
            placeholder="Введите поисковый запрос"
          />

          <Button variant="contained" color="secondary" size="large">Искать</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
