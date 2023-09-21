import React from "react";

/****************************************************************************
 * ### useKeyDown()
 *
 * React Hook that binds a callback function to a keydown event of a
 * specified element.
 *
 * @param {function} callback
 * Function to run on keydown event.
 *
 * @param {array} keys
 * Keys to bind keydown event to.
 *
 * @param {object} [props]
 * @param {element} [props.element=document]
 * @param {array} [props.modifiers=[]]
 * @param {boolean} [props.logEvent=false]
 ****************************************************************************/
function useKeyDown(callback, keys,
   {element=document, modifiers=[], logEvent=false}={}
) {
   try {
      const onKeyDown = (event) => {
         if (logEvent) console.log(event);

         const conditions = {
            anyKeyPressed: keys.some((key) => event.code === key),
            altMatch: event.altKey == modifiers.includes("altKey"),
            ctrlMatch: (event.metaKey || event.ctrlKey) ==
               modifiers.includes("metaKey"),
         };

         const allTrue = (arr) => Object.values(arr)
            .every(condition => condition === true)

         if (allTrue(conditions)) {
            event.preventDefault();
            callback();
         }
      };

      React.useEffect(() => {
         element.addEventListener("keydown", onKeyDown);

         return () => {
            element.removeEventListener("keydown", onKeyDown);
         };
      }, [onKeyDown]);
   }
   catch (err) {
      console.warn("useKeyDown() error:", err);
   }
};

export default useKeyDown;
