import React, {
    useState
} from "react";
import { 
    SearchBar as VtexSearchBar 
} from 'vtex.store-components';
import style from "./styles.css";

function SearchBar() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(!open)} className={style.buttonContainer}>Buscar</button>
            <div className={`${style.overlayContainerBar} ${open ? style.open : ' '}`} onClick={() => setOpen(!open)}></div>
            <div className={`${style.containerBar} ${open ? style.open : ' '}`}>
                <div className="flex items-center justify-center">
                    <div style={{width: "100%"}}><VtexSearchBar /></div>
                </div>
            </div>
        </>
    )
}

export default SearchBar;