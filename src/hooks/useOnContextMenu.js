import React from "react";

/****************************************************************************
 * ### useOnContextMenu()
 *
 * React Hook that binds a callback function to a click event of a
 * specified element.
 *
 * @param {function} callback
 * Function to run on oncontextmenu event.
 *
 * @param {object} [props]
 * @param {element} [props.element=document]
 * @param {boolean} [props.logEvent=false]
 ****************************************************************************/
export function useOnContextMenu(callback, 
   { element = document, modifiers = [], logEvent = false } = {}
) {
   try {
      const onContextMenu = !element ? () => {} : (event) => {
         if (logEvent) {
            console.log({
               event, callback,
               element, modifiers, logEvent
            });
         }

         const conditions = {
            altMatch: event.altKey === modifiers.includes("altKey"),
         };

         const allTrue = (arr) => Object.values(arr)
            .every(condition => condition === true);

         if (!allTrue(conditions)) return;

         event.preventDefault();
         callback();
      };

      React.useEffect(() => {
         // using `element?.` to prevent the need for an early return
         element?.addEventListener("click", onContextMenu);

         return () => {
            element?.removeEventListener("oncontextmenu", onContextMenu);
         };
      }, [onContextMenu]);
   }
   catch (err) {
      console.warn("useOnContextMenu() error:", err, {
         callback, element, modifiers, logEvent
      });
   }
}

export default useOnContextMenu;
