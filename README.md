# Transit
Transit is an app to record employee info.
Built using Angular 10, Ionic 5 and Firebase.

## Preview on Browser
Clone into the repository and install dependencies with
```
npm install
```
<br>

Use the ionic cli to host on a local nodejs server
```
ionic serve
```

## Deploy to iOS

Clone into the repository and install dependencies with
```
npm install
```
<br>

Convert into an xcode project using 
```
ionic cordova build ios --prod
```
<br>

Open the .xcodeproj file located in platforms/ios.<br>
Connect your phone via USB and select it as run target. <br>
Click on the Run button on Xcode and run the app on your device.
<br><br>
If Xcode throws a signing error, go to "Signing and Capabilities" tab, rename the "Bundle Identifier" and hit "Try Again"
<br>
Once resolved, click on the Run button on Xcode and run the app on your device.
