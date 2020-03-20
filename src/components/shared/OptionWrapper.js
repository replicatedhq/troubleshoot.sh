import React from "react";

export default function OptionWrapper({children}) {
  return (
    <div className="wrapperForm u-marginTop--small">
      <div className="u-position--relative flex">
        <div className="flex flex1">
          <div className="flex flex1 alignItems--center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
