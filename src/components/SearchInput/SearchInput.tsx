import clsx from 'clsx';
import { type InputHTMLAttributes, forwardRef } from 'react';
import classes from './SearchInput.module.scss';

/** Search input component props */
export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * Stylized search input
 * @param props Component props
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const { className, ...restProps } = props;

  return <input ref={ref} type="search" className={clsx(classes.SearchInput, className)} {...restProps} />;
});
