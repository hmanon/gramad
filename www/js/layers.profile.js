dependencies = {
    resourceName: "garm",
    layers: [
        {   name: 'garm.adminlayer.js',
            resourceName: 'garm.adminlayer',
            dependencies: [
                'garm.adminlayer'
            ]
        }
    ],

    prefixes: [
        [ 'dijit', '../dijit' ],
        [ 'dojox', '../dojox' ],
        [ 'uuid',  '../../uuid' ],
        [ 'garm',  '../../garm' ]
    ]
}
