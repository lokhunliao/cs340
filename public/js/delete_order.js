function deleteOrder(orderID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: orderID
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-order/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteRow(orderID);
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  
  function deleteRow(orderID){
  
    let table = document.getElementById("orders-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == orderID) {
            table.deleteRow(i);
  
            break;
       }
    }
  }
  
  
  // function deleteItem(itemID) {
  //   let link = '/delete-item/';
  //   let data = {
  //     id: itemID
  //   };
  
  //   $.ajax({
  //     url: link,
  //     type: 'DELETE',
  //     data: JSON.stringify(data),
  //     contentType: "application/json; charset=utf-8",
  //     success: function(result) {
  //       deleteRow(itemID);
  //     }
  //   });
  // }
  
  // function deleteRow(itemID){
  //     let table = document.getElementById("items-table");
  //     for (let i = 0, row; row = table.rows[i]; i++) {
  //        if (table.rows[i].getAttribute("data-value") == itemID) {
  //             table.deleteRow(i);
  //             break;
  //        }
  //     }
  // }