import {
    getFirestore,
    getDoc,
    setDoc,
    addDoc,
    collection,
    doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { DockRounded } from "@mui/icons-material";


export const populateData = () => (
    <div>
        Populate data
        {/* <button  onClick={() => (populateMaintenance())}>Populate maintenance</button> */}
        {/* <button onClick={() => (populateBuilding(7))}>Populate building</button>
        <button>Populate maintenance</button>
        <button>Populate request</button>
        <button>Populate tenant</button>
        <button>Populate user</button>
        <button>Populate vendor</button> */}
        {/* <button onClick={() => (populateAll())} >Populate all</button> */}
    </div>
)

const firebaseConfig = {
    apiKey: "AIzaSyDx0Mevlnf4oDjDYidM2EzkOiOpXHoiZBo",
    authDomain: "xqz-cs5356.firebaseapp.com",
    projectId: "xqz-cs5356",
    storageBucket: "xqz-cs5356.appspot.com",
    messagingSenderId: "748563665138",
    appId: "1:748563665138:web:8a7fbbfcecedf8a0b0006b"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);

function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomElementFromArray(array) {
    return array[generateRandomInteger(0, array.length)];
}

const maintenanceItem = {
    "Apartment Interior": ["ceiling", "counter top", "drawer", "paint", "paneling", "pest control", "shelving", "wallpaper"],
    "Appliance": ["cloth dryer", "cloth wash", "cook top", "dishwasher", "disposal", "freezer", "microwave", "refrigerator"],
    "Doors and Locks": ["exterior door", "lock", "patio door"],
    "Electrical and Lighting": ["electrical box", "exterior lighting", "lightbulbs", "power", "switches"],
    "Heating and Cooling": ["air conditioner", "fireplace", "heater", "humidity", "thermostat", "water chiller"],
    "Plumbing and Bath": ["bathroom", "hot water heater", "leak", "mirror", "shower", "sink", "toilet", "tub"],
    "Other": ["other"]
}

async function populateAll() {
    const maintenancesId = await populateMaintenance();
    const buildingsId = await populateBuilding(2);
    const tenantsId = await populateTenant(buildingsId, 20);
    const landlordsId = await populateLandlord(buildingsId, 3);
    const vendorsId = await populateVendor(3);
    const requestsId = await populateRequest(8, tenantsId, vendorsId, maintenancesId);

    console.log(`Successfully populated 
        ${maintenancesId.length} maintenances, 
        ${buildingsId.length} buildings,
        ${tenantsId.length} tenants, 
        ${vendorsId.length} vendors,
        ${landlordsId.length} landlords, 
        ${requestsId.length} requests.`)
}

async function populateMaintenance() {
    const data = []
    for (const category in maintenanceItem) {
        const allSubCategories = maintenanceItem[category];
        for (const subCategory of allSubCategories) {
            const docRef = await addDoc(collection(db, "maintenance"), {
                category: category,
                subCategory: subCategory,
                urgency: generateRandomInteger(0, 3),
            });
            const docId = docRef.id;
            data.push(docId);
        }
    }
    console.log("successfully populated maintenance", data);
    return data;
}

async function populateBuilding(count) {
    const data = []
    for (let i = 1; i <= count; i++) {
        const docRef = await addDoc(collection(db, "building"), {
            name: "building" + i,
            address: `${generateRandomInteger(100, 1000)} main st, New York, NY, ${generateRandomInteger(10000, 100000)}`
        });
        const docId = docRef.id;
        data.push(docId);
    }
    console.log("successfully populated buildings: ", data);
    return data
}

async function populateTenant(buildings, count) {
    const data = []
    for (let i = 1; i <= count; i++) {
        const docRef = await addDoc(collection(db, "tenant"), {
            email: `tenant${i}@gmail.com`,
            buildingId: getRandomElementFromArray(buildings),
            room: generateRandomInteger(1000, 10000).toString(),
            phoneNumber: `${generateRandomInteger(100, 1000)}-${generateRandomInteger(100, 1000)}-${generateRandomInteger(1000, 10000)}`,
        });
        const docId = docRef.id;
        data.push(docId);
    }
    console.log("successfully populated tenant: ", data);
    return data;
}

async function populateLandlord(buildings, count) {
    const data = []
    for (let i = 1; i <= count; i++) {
        const docRef = await addDoc(collection(db, "landlord"), {
            email: `landlord${i}@gmail.com`,
            buildings: [getRandomElementFromArray(buildings)],
            phoneNumber: `${generateRandomInteger(100, 1000)}-${generateRandomInteger(100, 1000)}-${generateRandomInteger(1000, 10000)}`,
        });
        const docId = docRef.id;
        data.push(docId);
    }
    console.log("successfully populated landlord: ", data);
    return data;
}

async function populateVendor(count) {
    const data = []
    for (let i = 1; i <= count; i++) {
        const docRef = await addDoc(collection(db, "vendor"), {
            name: "vendor" + i,
            phoneNumber: `${generateRandomInteger(100, 1000)}-${generateRandomInteger(100, 1000)}-${generateRandomInteger(1000, 10000)}`,
        });
        const docId = docRef.id;
        data.push(docId);
    }
    console.log("successfully populated vendor: ", data);
    return data;
}

async function populateRequest(count, tenantsId, vendorsId, maintenancesId) {
    const data = []
    const preferTimeWeekday = [generateRandomInteger(0, 24), generateRandomInteger(0, 24), generateRandomInteger(0, 24)];
    const preferTimeWeekend = [generateRandomInteger(0, 24), generateRandomInteger(0, 24), generateRandomInteger(0, 24), generateRandomInteger(0, 24)];
    for (let i = 1; i <= count; i++) {
        const docRef = await addDoc(collection(db, "request"), {
            tenantId: getRandomElementFromArray(tenantsId),
            vendorId: getRandomElementFromArray(vendorsId),
            maintenanceId: getRandomElementFromArray(maintenancesId),
            description: "populated request " + i,
            dateCreated: new Date(),
            preferTimeWeekday: preferTimeWeekday,
            preferTimeWeekend: preferTimeWeekend,
            scheduledTime: new Date(2022, generateRandomInteger(5, 12), generateRandomInteger(1, 30), generateRandomInteger(0, 24)),
        });
        const docId = docRef.id;
        data.push(docId);
    }
    console.log("successfully populated requests: ", data);
    return data
}