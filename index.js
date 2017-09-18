require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/Symbol3D",
    "esri/symbols/Symbol3DLayer",
    "esri/symbols/PolygonSymbol3D",
    "esri/symbols/ExtrudeSymbol3DLayer",
    "dojo/domReady!"
],
function(Map, SceneView, FeatureLayer, SimpleRenderer, Symbol3D, Symbol3DLayer, PolygonSymbol3D, ExtrudeSymbol3DLayer){
    var map = new Map({
        basemap: "satellite",
        ground: "world-elevation"
    });
    var sv = new SceneView({
        container: "scene",
        map: map,
        center: [106.85, -6.2],
        zoom: 11
    });
    var tessellationLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/TWq7UjmDRPE14lEV/arcgis/rest/services/tessellation_jakarta/FeatureServer/0",
        renderer: new SimpleRenderer({
            symbol: new PolygonSymbol3D({
                symbolLayers: [new ExtrudeSymbol3DLayer({
                    size: 1000,
                    material: {color: "cyan"}
                })]
            }),
            visualVariables: [{
                type: "size",
                field: "TOTAL",
                valueExpression: "100+$feature.TOTAL*300"
            }]
        }) ,
        outFields: ["TOTAL"] 
    });
    map.add(tessellationLayer);
});