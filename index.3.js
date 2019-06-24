var canvas = document.getElementById("renderCanvas");

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
   // scene.debugLayer.show();
    var camera = new BABYLON.ArcRotateCamera('MainCamera1', 0, 0, 3, BABYLON.Vector3(0, 1.2, 0), scene, true);
    camera.position = new BABYLON.Vector3(0, 1.2, -1.1);
    camera.attachControl(canvas, true);
    camera.inputs.attached.mousewheel.detachControl(canvas);
    
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

    var Box_Left_MainTrigger = BABYLON.MeshBuilder.CreateBox("Box_Left_MainTrigger",{},scene);
    Box_Left_MainTrigger.position = new BABYLON.Vector3(-2.5,1,3);

    var Box_Left_SedondaryTrigger = BABYLON.MeshBuilder.CreateBox("Box_Left_SedondaryTrigger",{},scene);
    Box_Left_SedondaryTrigger.position = new BABYLON.Vector3(-2.5,-1,3);

    var Sphere_Left_YButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Left_YButton", {diameter:1}, scene);
    Sphere_Left_YButton.position = new BABYLON.Vector3(-2,0,3);

    var Sphere_Left_XButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Left_XButton", {diameter:1}, scene);
    Sphere_Left_XButton.position = new BABYLON.Vector3(-2,0,2);


    var Box_Left_Stick = BABYLON.MeshBuilder.CreateBox("Box_Left_Stick",{size:0.5},scene);
    Box_Left_Stick.position = new BABYLON.Vector3(-1,0,1);


    var Box_Right_MainTrigger = BABYLON.MeshBuilder.CreateBox("Box_Right_MainTrigger",{},scene);
    Box_Right_MainTrigger.position = new BABYLON.Vector3(2.5,1,3);

    var Box_Right_SedondaryTrigger = BABYLON.MeshBuilder.CreateBox("Box_Right_SedondaryTrigger",{},scene);
    Box_Right_SedondaryTrigger.position = new BABYLON.Vector3(2.5,-1,3);

    var Sphere_Right_BButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Right_BButton", {diameter:1}, scene);
    Sphere_Right_BButton.position = new BABYLON.Vector3(2,0,3);

    var Sphere_Right_AButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Right_AButton", {diameter:1}, scene);
    Sphere_Right_AButton.position = new BABYLON.Vector3(2,0,2);

    var Box_Right_Stick = BABYLON.MeshBuilder.CreateBox("Box_Right_Stick",{size:0.5},scene);
    Box_Right_Stick.position = new BABYLON.Vector3(1,0,1);

    //for VR
    var vrHelper = scene.createDefaultVRExperience();

    const leftHand = BABYLON.Mesh.CreateBox("leftHand",0.1, scene);
    leftHand.scaling.z = 2;
    leftHand.isVisible =false;

    const rightHand = BABYLON.Mesh.CreateBox("rightHand",0.1, scene);
    rightHand.scaling.z = 2;
    rightHand.isVisible =false;


    vrHelper.onControllerMeshLoaded.add((webVRController)=>{
        //left:Y, right:B
        webVRController.onSecondaryButtonStateChangedObservable.add((stateObject)=>{
            if(webVRController.hand ==='left'){
                if(stateObject.pressed === true){
                    console.error("Left Y button  pushed"); 
                    if(Sphere_Left_YButton.scaling.x ==1){                               
                        Sphere_Left_YButton.scaling = new BABYLON.Vector3(1.2,1.2,1.2);
                    }else{
                        Sphere_Left_YButton.scaling = new BABYLON.Vector3(1,1,1);
                    }               
                }
            }else{
                if(stateObject.pressed === true){
                    console.error("Right B button pushed"); 
                    if(Sphere_Right_BButton.scaling.x ==1){                            
                        Sphere_Right_BButton.scaling = new BABYLON.Vector3(1.2,1.2,1.2);
                    }else{
                        Sphere_Right_BButton.scaling = new BABYLON.Vector3(1,1,1);
                    }  
                }
                
            }
                
        });
        //left:X, right:A
        webVRController.onMainButtonStateChangedObservable.add((stateObject)=>{
            if(webVRController.hand ==='left'){
                if(stateObject.pressed === true){
                    if(Sphere_Left_XButton.scaling.x ==1){                               
                        Sphere_Left_XButton.scaling = new BABYLON.Vector3(1.2,1.2,1.2);
                    }else{
                        Sphere_Left_XButton.scaling = new BABYLON.Vector3(1,1,1);
                    }               
                }
                
            }else{
                if(stateObject.pressed === true){
                    if(stateObject.pressed === true){
                        if(Sphere_Right_AButton.scaling.x ==1){                            
                            Sphere_Right_AButton.scaling = new BABYLON.Vector3(1.2,1.2,1.2);
                        }else{
                            Sphere_Right_AButton.scaling = new BABYLON.Vector3(1,1,1);
                        }  
                    }
                    }
                
            }
                
        });
        
        //Trigger button
        var leftLastTriggerValue,rightLastTriggerValue;
        webVRController.onTriggerStateChangedObservable.add((stateObject)=>{
            
            if(webVRController.hand ==='left'){
                if(leftLastTriggerValue < 0.9 && stateObject.value >= 0.9){
                    if(Box_Left_MainTrigger.scaling.x ==1){                               
                        Box_Left_MainTrigger.scaling = new BABYLON.Vector3(1.2,1.2,1.2);
                    }else{
                        Box_Left_MainTrigger.scaling = new BABYLON.Vector3(1,1,1);
                    }  
                }
                leftLastTriggerValue = stateObject.value;
            }else{
                if(rightLastTriggerValue < 0.9 && stateObject.value >= 0.9){
                    if(Box_Right_MainTrigger.scaling.x ==1){                               
                        Box_Right_MainTrigger.scaling = new BABYLON.Vector3(1.2,1.2,1.2);
                    }else{
                        Box_Right_MainTrigger.scaling = new BABYLON.Vector3(1,1,1);
                    } 
                }
                rightLastTriggerValue = stateObject.value;
            }
            
                
        });
        
        //secondary trigger button
        var leftLastSecondaryTriggerValue,rightLastSecondaryTriggerValue;
        webVRController.onSecondaryTriggerStateChangedObservable.add((stateObject)=>{
            
            if(webVRController.hand ==='left'){
                if(leftLastSecondaryTriggerValue < 0.9 && stateObject.value >= 0.9){    
                    if(Box_Left_SedondaryTrigger.scaling.x ==1){                               
                        Box_Left_SedondaryTrigger.scaling = new BABYLON.Vector3(1.2,1.2,1.2);
                    }else{
                        Box_Left_SedondaryTrigger.scaling = new BABYLON.Vector3(1,1,1);
                    }             
                
                }
                leftLastSecondaryTriggerValue = stateObject.value;
            }else{
                if(rightLastSecondaryTriggerValue < 0.9 && stateObject.value >= 0.9){
                    if(Box_Right_SedondaryTrigger.scaling.x ==1){                               
                        Box_Right_SedondaryTrigger.scaling = new BABYLON.Vector3(1.2,1.2,1.2);
                    }else{
                        Box_Right_SedondaryTrigger.scaling = new BABYLON.Vector3(1,1,1);
                    }                     
                }
                rightLastSecondaryTriggerValue = stateObject.value;
            }
            
                
        });

        //stick
        webVRController.onPadValuesChangedObservable.add((stateObject)=>{
            if(webVRController.hand ==='left'){
                Box_Left_Stick.position.x += stateObject.x/100;
                Box_Left_Stick.position.y += stateObject.y/100;
            }else{
                Box_Right_Stick.position.x += stateObject.x/100;
                Box_Right_Stick.position.y += stateObject.y/100;   
            }   
        });
    });




    return scene;
};

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});