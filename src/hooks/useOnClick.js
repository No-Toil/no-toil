import React from "react";

/****************************************************************************
 * ### useOnClick()
 *
 * React Hook that binds a callback function to a click event of a
 * specified element.
 *
 * @param {function} callback
 * Function to run on click event.
 *
 * @param {object} [props]
 * @param {element} [props.element=document]
 * @param {array} [props.modifiers=[]]
 * @param {boolean} [props.logEvent=false]
 ****************************************************************************/
export function useOnClick(callback, { element = document, modifiers = [], logEvent = false } = {}) {
   try {
      const onClick = (event) => {
         if (logEvent) console.log(event);

         const conditions = {
            altMatch: event.altKey === modifiers.includes("altKey"),
            /****************************************************************
             * note that on MacOS, the ctrlKey will cause the right click
             * event, which will fire an onContextMenu event instead of an
             * onClick event.
             ****************************************************************/
            ctrlMatch: (event.metaKey || event.ctrlKey) ===
               modifiers.includes("metaKey"),
         };

         const allTrue = (arr) => Object.values(arr)
            .every(condition => condition === true);

         if (!allTrue(conditions)) return;

         event.preventDefault();
         callback();
      };

      React.useEffect(() => {
         element.addEventListener("click", onClick);
         return () => { element.removeEventListener("click", onClick); };
      }, [onClick]);
   }
   catch (err) {
      console.warn("useOnClick() error:", err);
   }
}

export default useOnClick;
