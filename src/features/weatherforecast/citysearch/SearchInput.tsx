import React from "react";
import clsx from "clsx";
import IconButton from "common/ui/IconButton";
import Throbber from "./SearchInputThrobber";
import { MdClear } from "react-icons/md";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  onChange: (searchQuery: string)=>{},
  value: string;
  isLoading?: boolean;
}

function SearchInput(props: SearchInputProps): React.ReactElement{
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [deferredTimeout, setDeferredTimeout] = React.useState< ReturnType<typeof setTimeout> | undefined>();
  React.useEffect(()=>{
    if(props.value === ""){
      setSearchQuery("");
    }
  }, [props.value]);

  React.useEffect(()=>()=>{
    if(deferredTimeout){
      clearTimeout(deferredTimeout);
    }
  },[deferredTimeout]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    if (deferredTimeout) {
      clearTimeout(deferredTimeout);
    }
    if (event.target.value.length > 0) {
      setDeferredTimeout(setTimeout(() => {
        props.onChange(event.target.value);
      }, 800));
    } else {
      setDeferredTimeout(setTimeout(() => {
        props.onChange(event.target.value);
      }, 20));
    }
  };
  const clearSearch = () => {
    if(deferredTimeout){
      clearTimeout(deferredTimeout);
    }
    setSearchQuery("");
    props.onChange("");
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      clearSearch();
      event.currentTarget.blur();
    }
  };

  return (
    <div className={styles.root}>
      <input
        type="text"
        className={clsx({
          [styles.searchTxtFld]: true,
          [styles.active]: searchQuery,
        })}
        value={searchQuery}
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
        placeholder="Search for cities..."
      />
      {searchQuery && !props.isLoading && (
        <IconButton
          className={styles.closeSearchBtn}
          onClick={clearSearch}
          data-testid="searchInputCloseSearchIcon"
        >
          <MdClear />
        </IconButton>
      )}
      {props.isLoading && <Throbber/>}
    </div>
  );
}

export default SearchInput;
