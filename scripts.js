//-----------GENERATING OTP-----------
function GenerateOTP()
{ 
  const aadhaar_number = document.getElementById("aadhaar_number").value;
  const digits = "0123456789";
  let checked_aadhaar_number = "";
  let wrong_chars = "";
  for(let i = 0; i<aadhaar_number.length; i++)
  {
    if(digits.includes(aadhaar_number[i]))
    {
      checked_aadhaar_number += aadhaar_number[i];
    }
    else
    {
      wrong_chars += aadhaar_number[i];
    }
  }
  console.log(checked_aadhaar_number);
  console.log(wrong_chars);
  if(wrong_chars.length > 0)
  {
    const warning = `Only digits [0-9] are allowed. Missing Digits: ${wrong_chars.length}`;
    appendMessage(warning, "red");
  }
  else if(checked_aadhaar_number.length <12)
  {
    const message = `Aadhaar Number must be 12 digits. Missing Digits: ${12 - checked_aadhaar_number.length}`;
    console.log(message);
    appendMessage(message, "red");
  }
  else
  {
    const response = 
    //RESPONSE 1: SUCCESS
    `{ "code": 200, "timestamp": 1647439112523, "transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
         "data": { "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.response", "reference_id": "1234567",
                   "message": "OTP sent successfully"}
       }`; 
       
    //RESPONSE 2: FALIURE 1
    /* `{ "code": 200, "timestamp": 1647439112623, "transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
         "data": { "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.response", "message": "Invalid Aadhaar Card" }
       }`;  */

    //RESPONSE 3: FALIURE 2
    /* `{ "code": 200, "timestamp": 1672226687297, "transaction_id": "a4d95225-1802-475b-a990-e57af523ea6e",
         "message": "OTP generated for this aadhaar, please try after 45 seconds" }`; */

    //RESPONSE 4: FALIURE 3
    /* `{ "code": 422, "timestamp": 1647439112623, "transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
          "data": { "message": "Invalid Aadhaar number pattern" }
        }`; */

    const data = JSON.parse(response);
    try
      {
        if(data.code == 422)
        {
          throw new Error(data.message);
        }
        else if(data.message == "OTP generated for this aadhaar, please try after 45 seconds")
        {
          console.log(data.message);
          appendMessage(data.message, "red");
        }
        else
        {
          if(data.data.message ==  "OTP sent successfully")
          {
            console.log(data.data.message);
            appendMessage(data.data.message, "green");
            displayOTPField();
          }
          else if(data.data.message ==  "Invalid Aadhaar Card")
          {
            console.log(data.data.message);
            appendMessage(data.data.message, "red");
          }
          else
          {
            console.log(data.code);
            appendMessage(data.message, "red");
          }
        }
      }
      catch(error)
      {
        console.log(error);
        console.log(data.data.message);
        appendMessage(data.data.message, "red");
      }
  }
}
//-----------DISPLAYING APPROPRIATE MESSAGES-----------
function appendMessage(message, color)
{   
  const info = document.getElementById("info");
  info.textContent = message;
  info.style.color = color;
  info.classList.add("message");
}
//-----------REDESIGNING EXISTING FORM-----------
function displayOTPField()
{ 
  const label = document.getElementById("label");
  label.textContent = "Enter OTP sent to registered mobile number:";
  label.setAttribute('for','otp_number');
  const button = document.getElementById("button");
  button.textContent = "Verify OTP";
  button.setAttribute('onclick','VerifyOTP()');
  const old_input = document.getElementById("aadhaar_number");
  old_input.value = "";
  old_input.setAttribute('placeholder', '123456');
  old_input.setAttribute('maxlength', '6');
  old_input.setAttribute('id', 'otp_number');
}
//------------VERIFYING OTP AND STORING DATA IN 'infromation'------------
var information;
function VerifyOTP()
{
  const otp_number = document.getElementById("otp_number").value;
  const digits = "0123456789";
  let checked_otp_number = "";
  let wrong_chars = "";
  for(let i = 0; i<otp_number.length; i++)
  {
    if(digits.includes(otp_number[i]))
    {
      checked_otp_number += otp_number[i];
    }
    else
    {
      wrong_chars += otp_number[i];
    }
  }
  console.log(checked_otp_number);
  console.log(wrong_chars);
  if(wrong_chars.length > 0)
  {
    const warning = `Only digits [0-9] are allowed. Missing Digits: ${wrong_chars.length}`;
    appendMessage(warning, "red");
  }
  else if(otp_number.length < 6)
  {
    const message = `OTP must be 6 digits. Missing: ${6 - otp_number.length}`;
    console.log(message);
    appendMessage(message, "red");
  }
  else
  {
    const response = 
    //RESPONSE 1: SUCCESS
    `{ "code": 200, "timestamp": 1647439112523,"transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
       "data": { "@entity": "in.co.sandbox.kyc.aadhaar.okyc", "reference_id": "1234567", "status": "VALID",
                 "message": "Aadhaar Card Exists", "care_of": "S/O: Johnny Doe",
                 "full_address": "Mangal Kanaka Niwas, Main Cross 3rd, Bengaluru, Bengaluru-Karnataka, India ",
                 "date_of_birth": "21-04-1985", "email_hash": "044917e2c4c62a439d068.......d9f71bbde10b1d227a914e",
                 "gender": "M", "name": "John Doe", "address": {"@entity": "in.co.sandbox.kyc.aadhaar.okyc.address",
                                                                "country": "India", "district": "Bengaluru",
                                                                "house": "Mangal Kanaka Niwas", "landmark": "",
                                                                "pincode": "581615", "post_office": "Bengaluru",
                                                                "state": "Karnataka", "street": "Main Cross 3rd",
                                                                "subdistrict": "", "vtc": "Bengaluru" },
                 "year_of_birth": "1985", "mobile_hash": "044917e2c4c62a439d068.......d9f71bbde10b1d227a914e",
                 "photo": "data:image/jpeg;base64,/9j/4AAQSk.......mj/2Q==", "share_code": "1234" }
      }`; 
           
    //RESPONSE 2: FALIURE 1
    /* `{ "code": 200, "timestamp": 1672226687297, "transaction_id": "a4d95225-1802-475b-a990-e57af523ea6e",
          "message": "Request under process, please try after 30 seconds" }`; */

    //RESPONSE 3: FALIURE 2
    /* `{ "code": 200, "timestamp": 1647439112523, "transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
          "data": { "@entity": "in.co.sandbox.kyc.aadhaar.okyc", "message": "Invalid OTP"} 
        }`;  */
        

    //RESPONSE 4: FALIURE 3
    /* `{ "code": 200, "timestamp": 1715627385316, "transaction_id": "689093f0-0331-4022-bf01-ea67687f955a",
          "data": { "@entity": "in.co.sandbox.kyc.aadhaar.okyc", "message": "OTP expired" }
        }`;  */
    
    //RESPONSE 5: FALIURE 4
    /* `{ "code": 200, "timestamp": 1647439112523, "transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
          "data": { "@entity": "in.co.sandbox.kyc.aadhaar.okyc", "message": "Invalid Reference Id" }
        }`;  */

    //RESPONSE 6: FALIURE 5
    /* `{ "code": 422, "timestamp": 1647439112523, "transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
          "message": "OTP missing in request" }`;  */
    
    //RESPONSE 7: FALIURE 6
    /* `{ "code": 422, "timestamp": 1647439112523, "transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
          "message": "Invalid Reference Id" }`;  */

    const data = JSON.parse(response);
    try
      { if(data.code == 422)
        { if(data.message == "OTP missing in request")
          { throw new Error(data.message);  }
          else
          { throw new Error(data.message);  }          
        }
        else if(data.message == "Request under process, please try after 30 seconds")
        { console.log(data.message);
          appendMessage(data.message, "green");
        }
        else
        { if(data.data.message ==  "Aadhaar Card Exists")
          { console.log(data.data.message);
            appendMessage(data.data.message, "green");
            information = data;
            const button = document.getElementById("button");
            button.textContent = "Display Aadhaar";
            button.style.backgroundColor = "limegreen";
            button.style.border = "2px solid #218b21";
            button.setAttribute('onclick',`displayAadhaar()`);            
          }
          else if(data.data.message ==  "Invalid OTP")
          { console.log(data.data.message);
            appendMessage(data.data.message, "red");
          }
          else if(data.data.message ==  "OTP expired")
          { console.log(data.data.message);
            appendMessage(data.data.message, "red");
          }
          else
          { console.log(data.data.message);
            appendMessage(data.data.message, "red");
          }
        }
      }
      catch(error)
      { console.log(error);
        console.log(data.message);
        appendMessage(data.message, "red");
      }
  }
}
//------------DISPLAYING AADHAAR CARD------------
function displayAadhaar()
{   /* 
  inforamtion = `{ "code": 200, "timestamp": 1647439112523,"transaction_id": "250c5051-ecec-4803-9a1e-4e0b2f88cff8",
  "data": { "@entity": "in.co.sandbox.kyc.aadhaar.okyc", "reference_id": "1234567", "status": "VALID",
            "message": "Aadhaar Card Exists", "care_of": "S/O: Johnny Doe",
            "full_address": "Mangal Kanaka Niwas, Main Cross 3rd, Bengaluru, Bengaluru-Karnataka, India ",
            "date_of_birth": "21-04-1985", "email_hash": "044917e2c4c62a439d068.......d9f71bbde10b1d227a914e",
            "gender": "M", "name": "John Doe", "address": { "@entity": "in.co.sandbox.kyc.aadhaar.okyc.address",
                                                            "country": "India", "district": "Bengaluru",
                                                            "house": "Mangal Kanaka Niwas", "landmark": "",
                                                            "pincode": "581615", "post_office": "Bengaluru",
                                                            "state": "Karnataka", "street": "Main Cross 3rd",
                                                            "subdistrict": "", "vtc": "Bengaluru" },
            "year_of_birth": "1985", "mobile_hash": "044917e2c4c62a439d068.......d9f71bbde10b1d227a914e",
            "photo": "data:image/jpeg;base64,/9j/4AAQSk.......mj/2Q==", "share_code": "1234" }
   }`; */
    const form = document.getElementById("form");
    form.style.display = "none";

    const aadhaar = document.createElement("div");

    const top_image = document.createElement("img");
    top_image.src = "Images/emblem.jpg";
    top_image.classList.add("image1");
    const bottom_image = document.createElement("img");
    bottom_image.src = "Images/text.png";
    bottom_image.classList.add("image2");
    const photo = document.createElement("img");
    photo.src = "Images/photo.png";
    photo.classList.add("photo");
    
    const box1 = document.createElement("div");
    const box2 = document.createElement("div");
    const box3 = document.createElement("div");
    const box4 = document.createElement("div");
    const box5 = document.createElement("div");
    const name = document.createElement("h1");
    const DOB = document.createElement("h1");
    const gender = document.createElement("h1");
    const care_of = document.createElement("h1");
    const Address = document.createElement("h1");
    const hr = document.createElement("hr");

    name.textContent = information.data.name;
    DOB.textContent = information.data.date_of_birth;
    if(information.data.gender == "M")
    {
      gender.textContent = "Male";
    }
    else
    {
      gender.textContent = "Female";
    }
    care_of.textContent = information.data.care_of;
    Address.textContent = "Address: ";
    hr.classList.add("red-rule");

    //-------EXTRACTING ADDRESS-------
    const address = information.data.address;
    const{entity, country, district, house, landmark, pincode, post_office, state, street} = address;

    const Line1 = document.createElement("p");
    const Line2 = document.createElement("p");
    const Line3 = document.createElement("p");

    Line1.textContent = `House: ${house}, Street: ${street}, District: ${district}`;
    Line2.textContent = `City: ${post_office}, State: ${state}, Country: ${country}`;
    Line3.textContent = `PinCode: ${pincode}`;


    box3.append(name);
    box3.append(DOB);
    box3.append(gender);
    box3.append(care_of);
    box3.classList.add("main");
    
    box5.append(Line1);
    box5.append(Line2);
    box5.append(Line3);
    box5.classList.add("address");

    box4.append(Address);
    box4.append(box5);
    box4.style.alignItems = "baseline"; 
    box4.style.fontFamily = "body";
    box4.classList.add("row");
    box4.classList.add("main");

    box2.append(box3);
    box2.append(box4);
    box2.classList.add("column");

    box1.append(photo);
    box1.append(box2);
    box1.classList.add("row");
    box1.classList.add("box1");

    aadhaar.append(top_image);
    aadhaar.append(box1);
    aadhaar.append(hr);
    aadhaar.append(bottom_image);
    aadhaar.classList.add("aadhaar");

    const section = document.getElementById("section");
    section.style.marginBottom = "100px";
    section.append(aadhaar);
}
