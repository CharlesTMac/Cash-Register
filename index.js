function checkCashRegister(price, cash, cid) {
//console.log(cid);
var denom =[
   {name: "ONE HUNDRED", val:100,},
   {name: "TWENTY", val:20,},
   {name: "TEN", val:10,},
   {name: "FIVE", val:5,},
   {name: "ONE", val:1,},
   {name: "QUARTER", val:0.25,},
   {name: "DIME", val:0.10,},
   {name: "NICKEL", val:0.05,},
   {name: "PENNY", val:0.01}
 ];
var output = { status: null, change: [] };
  var change = cash - price;
 
 console.log(change);

 var register = cid.reduce(
    function(acc, current) {
      acc.total += current[1];
      acc[current[0]] = current[1];
      console.log(acc);
      return acc;
    },
    { total: 0 }
  );

 
  for(let i=0;i<cid.length;i++){
    var registerTotal;
   
      registerTotal+=cid[i][1];
  }
console.log(registerTotal);



if(register.total<change){
  output.status="INSUFFICIENT_FUNDS";
  console.log(output);
  return output;
}else if(register.total==change){
  output.status= "CLOSED";
  output.change=cid;
  console.log(output);
  return output;
}
 console.log("pano pano");
 //loop through the denom
 var changeArr = denom.reduce(function(acc, current) {
    var value = 0;
   
    while (register[current.name] > 0 && change >= current.val) {
      change -= current.val;
      register[current.name] -= current.val;
      value += current.val;

      
      change = Math.round(change * 100) / 100;
    }
   
    if (value > 0) {
      acc.push([current.name, value]);
    }
    return acc; 
  }, []); 

  
  if (changeArr.length < 1 || change > 0) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }

 output.status="OPEN";
 output.change=changeArr;
 console.log(output);
 return output;
  
}
