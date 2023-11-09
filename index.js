

// Import necessary libraries
const cron = require('node-cron');
const admin = require('firebase-admin');
const FCM = require('fcm-node');


var http = require('http');

// Initialize Firebase Admin SDK
// const serviceAccount = require('../config/reminder-81de8-firebase-adminsdk-hg2fm-cc483471e4.json');
// const serviceAccount = require('./config/reminder-81de8-firebase-adminsdk-hg2fm-cc483471e4.json');




admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "reminder-81de8",
    "private_key_id": "cc483471e43376d005d3fab01ec040c414189cbd",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzhV4mC2lkNLjL\nGmHXWN83rirC0jSWvWm0U9xx4fxpCVuu64Beep/GvwLj6Ddsz2dy2SaaUyAWKMvm\nsGa8wARLmvCNz9DM+KvP9pLBz80Kg2k79dY0cW98NLsTli4tsxm+3TSojLMgqy6M\nki1vBYCONXZru3BBGjj+f/WhkNX79JX7NX3ywzk9SEfK3kUAvDodnI4T0SYk+FGG\nk+Zps+MlliIjb9aSKeQpheyCrTVWM5C5/lfd/xgNEwRjZMXD9nEEvm21feLFEEGy\nkXB9vO50egpJlciPxXPY4Xx2XHvE5DY8t3Ji10nSKCEwgnIilIdCeH0Pl9lSo4HP\nJWPLA4FDAgMBAAECggEAS6+yamrMQ8WglWypjH+5GIITIDE8n8L64l6q5c6nuucJ\nov1CEVM0srfMcabxWyw0Sqz3w//A2ubXVIrRvclc5j1MJxXTS9+ZnGOyKwk/wqt1\nviRe65xZqu2WY+Mg0/6bH6emcFtlmCPjy7tDcXfJ4+rxYulTIfd6yP3M4xGrzf3y\nxapuNLEC+xxGi0eEg1Yzb1EKF4lCzoDK+6JJJxzBg4a0YJO2YY08UEaCQMaIC1FA\nMarmCOtfIYoupTjI5q3TtmLYE8vSiQhMj8ONCvUUV/voyfzoeiTjohQKFURBMfck\nOYyXe4NhmTxWVRxIOTUvcWbxQvvWD5QldMcVi9rwhQKBgQDnU731cEDiKZIuh+G6\nAJ/x/PlJt0PJrewWBSNUITMgF7oXtJZ+vgR0N/MyZohwLy4exPMVfOd4GyGZNQjC\ntnGfBDRclDpQ9XaWF8njI6HRQVOsEcsqV/Kvk1QKV+L83jkkeXVGdPBSjB6wU0zH\nClL0gApU0GoXKjHCKxY4nldPjwKBgQDGqxZ0V9da9mwBCZkGCIotcGuD10BoEmBs\nvI2pR7rtXYc/SuUVFu2cjOxSCptUDMGs3/g3s/Efg0SrMdkv7vN5hdhsIqQHxD4m\nCIrZTrCtnC1OGioXQKUbB9X/3QNr2/MzhLh5GPjvQOeTgvKfcHcxm/Zq+ZLXLA0Z\n6pIzyXiZDQKBgCK2+3vYw7Ps/yYCeEp8i4Q6LYL1gLPEaPiI/ttCPDTluqSSEj+k\n7nAucU2v+2uyeN5fOgeQfgAVOj6OqejmjjiJ3f3CtNmvbINrwH1YvJD1l8Pry6xo\nFGBq4KLIu6StCLBDlejj5ajNpFFbvtrj3r0YdfRybmlZiKwV4TjP8lRbAoGAfkXK\nPOKEL/3GghZOm+YbpWv5+k97UWq0vQhPZhQAfNRgnVsGJhRvrHxpzG+PcKm3BCFL\nDGSj0qrFn6ZMbEoNmOT4vSp7ZbBW7Cer0RlR9Nb6eNTqgeMFzht56mnYvdqMRueJ\ntPaparCvQDQP8EU0jWSbCD1fFsKaBSnyCVZ5/5UCgYEApl6mCCudul+Tsdbaul8M\nN6QkZh/2XGKk/qWKRKksPoLXrmFn6LgE+Czx2lrpVGc8/xY5Op5ua5G20cu92qwG\nn5wGw0Ma9/v1u+1yCOy/pwg7li3GhhSOimbIB71JnOS6gT+qDI3GjhTmRINAd+mr\noWgmK4tMUrof6Z5/eL4JSxM=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-hg2fm@reminder-81de8.iam.gserviceaccount.com",
    "client_id": "107791273399400302756",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hg2fm%40reminder-81de8.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  )
});


// Initialize FCM with your FCM Server Key
const serverKey = 'AAAAsIdMip8:APA91bHCLk8F7llguoC7NG7fkAANwPc50VZGly78kGNnnZ2iggIFt6Ah0KwcVgMvCtURE-GFvxO_Ipy1_s6-kxTK6xFm0bPIFyOdnOAnpB_87Srd4QvYyQNp_aJsVgTQbinBhrPn1vZH';
const fcm = new FCM(serverKey);

// Reference to your Firestore collection
const db = admin.firestore();
const collectionRef = db.collection('reminder'); // Replace 'your_collection_name' with your actual collection name


// const checkAndSendNotifications = () => {
//   const now = new Date();
//   // console.log(now);
//   now.setSeconds(0);
//   now.setMilliseconds(0);

//   collectionRef.get().then(snapshot => {
//     // console.log(snapshot);
//     snapshot.forEach(async doc => {
//       console.log(doc.id);
//       const data = doc.data();

//       const title = data.title;
//       const startDateString = data.startdate.toDate(); // Convert to ISO string and remove milliseconds and 'Z'
//       const endDateString = data.enddate.toDate(); // Convert to ISO string and remove milliseconds and 'Z'

//       const startDate = new Date(startDateString); // Convert the modified string back to a Date object
//       const endDate = new Date(endDateString); // Convert the modified string back to a Date object


//       const deviceToken = data.deviceToken;
//       const reminderInterval = data.repeat || 5; // Default reminder interval is 5 minutes if not set in Firestore


//       // // Remove seconds and milliseconds from the dates

//       startDate.setSeconds(0);
//       startDate.setMilliseconds(0);
//       endDate.setSeconds(0);
//       endDate.setMilliseconds(0);

//       // console.log(now.getTime() == startDate.getTime());
//       // console.log(now.getTime() == endDate.getTime());
//       // console.log(data.active === false);
//       console.log((now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime()))
//       if (now.getTime() == startDate.getTime() || now.getTime() == endDate.getTime()) {
//         console.log("if");
//         sendNotification(deviceToken, `${title}`, now.getTime() === endDate.getTime() ? `Your Task is End` : `Your Start Time is ${startDate}`);
//         console.log('Dates are the same without considering seconds and milliseconds.');
//         console.log("from start and end");
//         update(now, doc.id)
//       }
//       else {
//         var a;
//         console.log(now);
//         console.log(endDate);
//         // console.log(now.getTime())
//         // console.log(endDate.getTime())
//         console.log(`id  : ${doc.id}`);
//         const comparisonResult = compareOnlyDates(now, endDate);
//         console.log(comparisonResult);
//         if (comparisonResult == "Both dates have the same day") {
//           console.log("same");
//           console.log("Both dates have the same day");

//           if (now < endDate) {
//             console.log("else if");
//           console.log("now < endDate");
            
//             // console.log(data);
//             // console.log(data.previousdate);
//             console.log(data.previousdate !== undefined);
//             if (data.previousdate !== undefined) {
//             console.log("data.previousdate !== undefined")
  
//               a = data.previousdate.toDate(); // Convert to ISO string and remove milliseconds and 'Z'
  
//               const previous = new Date(a);
//               previous.setSeconds(0);
//               previous.setMilliseconds(0);
//               console.log(`previous${previous}`);
//               console.log(`now${now}`);
  
  
//               // Usage example
//               const previousDate = new Date(previous);
//               const nowDate = new Date(now);
  
//               const difference = dateDiff(previousDate, nowDate);
//               console.log('Difference:', difference.minutes);
//               const remindertime = checkremindertime(reminderInterval);
//               console.log('Difference:', remindertime);
//               if (difference.minutes == remindertime) {
//                console.log("difference.minutes == remindertime")

//                 sendNotification(deviceToken, `Reminder ${title}${i}`, `${endDate}`);
//                 update(now, doc.id)
  
  
//               }
  
//             } else if (data.previousdate === undefined) {
//               console.log("else else if");
  
//               update(now, doc.id);
  
  
//             }
//           }
//         }
      

//       }
//     });
//   }).catch(err => {
//     console.error('Error getting documents', err);
//   });
// };


const checkAndSendNotifications = () => {
  const now = new Date();
  // console.log(now);
  now.setSeconds(0);
  now.setMilliseconds(0);

  collectionRef.get().then(snapshot => {
    // console.log(snapshot);
    snapshot.forEach(async doc => {
      console.log(doc.id);
      const data = doc.data();

      const title = data.title;
      const startDateString = data.startdate.toDate(); // Convert to ISO string and remove milliseconds and 'Z'
      const endDateString = data.enddate.toDate(); // Convert to ISO string and remove milliseconds and 'Z'

      const startDate = new Date(startDateString); // Convert the modified string back to a Date object
      const endDate = new Date(endDateString); // Convert the modified string back to a Date object


      const deviceToken = data.deviceToken;
      const reminderInterval = data.repeat || 5; // Default reminder interval is 5 minutes if not set in Firestore


      // // Remove seconds and milliseconds from the dates

      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      endDate.setSeconds(0);
      endDate.setMilliseconds(0);

      // console.log(now.getTime() == startDate.getTime());
      // console.log(now.getTime() == endDate.getTime());
      // console.log(data.active === false);
      console.log((now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime()))
      
      if (now.getTime() == startDate.getTime() || now.getTime() == endDate.getTime()) {
        console.log("if");
        sendNotification(deviceToken, `${title}`, now.getTime() === endDate.getTime() ? `Your Task is End` : `Your Start Time is ${startDate}`);
        console.log('Dates are the same without considering seconds and milliseconds.');
        console.log("from start and end");
        update(now, doc.id)
      }
      else {
        var a;
        console.log(`now ${now}`);
        console.log(`endtime ${endDate}`);
        // console.log(now.getTime())
        // console.log(endDate.getTime())
        console.log(`id  : ${doc.id}`);
        const comparisonResult = compareOnlyDates(now, endDate);
        console.log(comparisonResult);
        if (comparisonResult == "Both dates have the same day") {
          console.log("same");
          console.log("Both dates have the same day");

          if (now < endDate) {
            console.log("else if");
          console.log("now < endDate");
            
            // console.log(data);
            // console.log(data.previousdate);
            console.log(data.previousdate !== undefined);
            if (data.previousdate !== undefined) {
            console.log("data.previousdate !== undefined")
  
              a = data.previousdate.toDate(); // Convert to ISO string and remove milliseconds and 'Z'
  
              const previous = new Date(a);
              previous.setSeconds(0);
              previous.setMilliseconds(0);
              console.log(`previous${previous}`);
              console.log(`now${now}`);
  
  
              // Usage example
              const previousDate = new Date(previous);
              const nowDate = new Date(now);
  
              const difference = dateDiff(previousDate, nowDate);
              console.log('Difference:', difference.minutes);
              const remindertime = checkremindertime(reminderInterval);
              console.log('Difference:', remindertime);
              if (difference.minutes == remindertime) {
               console.log("difference.minutes == remindertime")

                sendNotification(deviceToken, `Reminder ${title}${i}`, `${endDate}`);
                update(now, doc.id)
  
  
              }
  
            } else if (data.previousdate === undefined) {
              console.log("else else if");
  
              update(now, doc.id);
  
  
            }
          }
        }
      

      }
    });
  }).catch(err => {
    console.error('Error getting documents', err);
  });
};
function compareOnlyDates(date1, date2) {
  const date1OnlyDate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2OnlyDate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  if (date1OnlyDate > date2OnlyDate) {
    return 'date1 is later than date2';
  } else if (date1OnlyDate < date2OnlyDate) {
    return 'date1 is earlier than date2';
  } else {
    return 'Both dates have the same day';
  }
}

const update = async (now, docid) => {
  await collectionRef.doc(docid).update({
    "previousdate": now
  })
    .then(() => {
      console.log('Document successfully updated.',docid);
    })
    .catch(error => {
      console.error('Error updating document:', error);
    });
}
function dateDiff(previousDate, nowDate) {
  const differenceInMilliseconds = Math.abs(nowDate - previousDate);

  const milliseconds = differenceInMilliseconds % 1000;
  const seconds = Math.floor((differenceInMilliseconds / 1000) % 60);
  const minutes = Math.floor((differenceInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((differenceInMilliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
const checkremindertime = (reminderInterval) => {
  switch (reminderInterval) {
    case '1 mins':
      return 1; // Run every 1 minutes
    case '2 mins':
      return 2; // Run every 2 minutes
    case '5 mins':

      return 3; // Run every 5 minutes
    case '15 mins':
      return 15; // Run every 15 minutes
    case '30 mins':
      return 30; // Run every 30 minutes
    case '45 mins':
      return 45; // Run every 45 minutes
    case '2 hours':
      return 120; // Run every hour
    case '1 hour':
      return 60; // Run every 2 hours
    default:
      return '*/5 * * * *'; // Default to every 5 minutes if interval not recognized
  }
};
const sendNotification = (deviceToken, title, body) => {
  const message = {
    to: deviceToken,
    notification: {
      title: title,
      body: body
    }
  };


  fcm.send(message, (err, response) => {
    if (err) {
      console.log(`Something has gone wrong! ${err}`);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

var i = 0;


// var server = http.createServer(async function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It work!\n sdsd',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//         console.log("test");
//         await collectionRef.doc("LVksnedYdHxWpgWU7jnB").update({
//           "live": "done"
//         })
//           .then(() => {
//             console.log('Document successfully updated.');
//           })
//           .catch(error => {
//             console.error('Error updating document:', error);
//           });
        // cron.schedule('0 */1 * * * *', () => {
          checkAndSendNotifications();
      // });

// console.log("test2");
//     res.end(response);
// });
// Set up server to listen on port 3000
// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });