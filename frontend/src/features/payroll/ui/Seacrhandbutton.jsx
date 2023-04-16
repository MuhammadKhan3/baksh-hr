import SearchBar from "./seachBar";
import AddDepartmentButton from "./addDepartmentButton";
import React from "react";


const SearchandAddContainer = ({ setemployeespay }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexGrow: 1 }}>
          <SearchBar setemployeespay={setemployeespay} />
        </div>
        <div style={{marginLeft:'15px'}}>
          <AddDepartmentButton />
        </div>
      </div>
    )

}

export default SearchandAddContainer



