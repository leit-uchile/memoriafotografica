export const home = () => {return (dispatch,getState) => {
    let headers = {"Content-Type": "application/json"};

    return fetch("/gallery/photo", {headers, method: "GET"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'RECOVERED_PHOTO', data: res.data });
          return res.data;
        } else {
          dispatch({type: "EMPTY", data: res.data});
          throw res.data;
        }
      })
}}

export const detail = (image) => {return (dispatch,getState) =>
{
    let single = {};
    dispatch({type: "DETAIL", data: image})
}}