export const mockDataItems = [
    {
        id: 'id-test-1',
        brand: 'Acer-test-1',
        model: 'Liquid Z6-test-1',
        price: '120-t',
        imgUrl: 'test.png'
    },
    {
        id: 'id-test-2',
        brand: 'Acer-test-2',
        model: 'Iconia Tab 10 A3-A40-test-2',
        price: '230-t',
        imgUrl: 'test.jpg'
    }
];

export const singleMockedItem = {
    id: 'test-id',
    brand: 'test-brand',
    model: 'test-model',
    price: 'test-price',
    imgUrl: 'test.png',
    networkTechnology: 'test-net',
    networkSpeed: 'test-speed1  test-speed2',
    gprs: 'Yes',
    edge: 'Yes',
    announced: 'test-promo',
    status: 'test-status',
    dimentions: '000',
    weight: '10',
    sim: 'test-sim',
    displayType: 'test-displayType',
    displayResolution: 'test-displayResolution',
    displaySize: 'test-displaySize',
    os: 'test-os',
    cpu: 'test-cpu',
    chipset: 'test-chipset',
    gpu: 'test-gpu',
    externalMemory: 'test-extMemory',
    internalMemory: ['int-1', 'int-2'],
    ram: 'test-ram',
    primaryCamera: ['test-cam1', 'test-cam2'],
    secondaryCmera: ['test-cam3', 'test-cam4'],
    speaker: 'test-speaker',
    audioJack: 'test-audioJack',
    wlan: ['test-wlan1', 'test-wlan2', 'test-wlan3'],
    bluetooth: ['test-b1', 'test-b2'],
    gps: 'test-gps',
    nfc: '',
    radio: 'test-radio',
    usb: 'test-usb',
    sensors: ['test-sensor1', 'test-sensor2'],
    battery: 'test-battery',
    colors: ['test-color'],
    options: {
        colors: [
            {
                code: 1,
                name: 'test-black'
            },
            {
                code: 2,
                name: 'test-white'
            }
        ],
        storages: [
            {
                code: 1,
                name: 'test-16'
            },
            {
                code: 2,
                name: 'test-32'
            }
        ]
    }
};

export const singleMockedItemWithOneSelection = {
    ...singleMockedItem,
    options: {
        colors: [
            {
                code: 1,
                name: 'test-black'
            }
        ],
        storages: [
            {
                code: 1,
                name: 'test-16'
            }
        ]
    }
};

export const mockItemDetailsWithObjects = {
    ...singleMockedItem,
    test_obj1: {
        obj1: [{ arr1: 'arr1', arr2: 'arr2' }]
    },
    test_obj2: {
        obj2: [{ arr3: 'arr3', arr4: 'arr4' }]
    },
    test_obj3: {
        obj3: [{ arr5: 'arr5', arr6: 'arr6' }]
    }
};

export const mockDataMutation = {
    id: 'test-id',
    colorCode: 10,
    storageCode: 20
};

export const mockDataMutationResponse = {
    count: 1
};

export const mockItemDetailsWithUrls = {
    ...singleMockedItem,
    url1: 'https://mockurl1.com',
    url2: 'http://mockUrl2.com',
    url3: './assetUrl.png',
    url4: './fileUrl.js'
};

export const mockUseLocationValue = {
    pathname: '/',
    search: '',
    hash: '',
    state: null
};

export const mockUseLocationValueWhenDetailsLanded = {
    pathname: '/details/undefined',
    search: '',
    hash: '',
    state: null
};
