import React from "react";
const componentDidUpdate=()=> {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
}
export  default componentDidUpdate();