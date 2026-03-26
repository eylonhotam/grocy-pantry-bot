function launchApp() {
    const landing = document.getElementById('landing-page');
    const app = document.getElementById('main-app');
    landing.style.opacity = '0';
    setTimeout(() => {
        landing.style.display = 'none';
        app.style.display = 'flex';
        setTimeout(() => { 
            app.style.opacity = '1'; 
            app.style.transform = 'scale(1)'; 
            document.getElementById('user-input').focus();
        }, 50);
    }, 300);
}

const CONFIG = {
    categories: {
        "Fruit": { em: "🍎", col: "#f87171" },
        "Vegetable": { em: "🥦", col: "#4ade80" },
        "Dairy": { em: "🥛", col: "#60a5fa" },
        "Meat": { em: "🥩", col: "#fb7185" },
        "Bakery": { em: "🍞", col: "#fbbf24" },
        "Pantry": { em: "🥫", col: "#a78bfa" }
    }
};

class Item {
    constructor(n, c, q, t) { this.name = n; this.category = c; this.quantity = q; this.threshold = t; }
    adjustQuantity(d) { this.quantity += d; if (this.quantity < 0) this.quantity = 0; }
}

class Inventory {
    constructor() {
        this.storage = new Map();
        this.load();
    }

    save() {
        const data = Array.from(this.storage.values());
        localStorage.setItem('grocy_persistent_data', JSON.stringify(data));
    }

    load() {
        const saved = localStorage.getItem('grocy_persistent_data');
        if (saved) {
            JSON.parse(saved).forEach(d => {
                this.storage.set(d.name.toLowerCase(), new Item(d.name, d.category, d.quantity, d.threshold));
            });
        }
    }

    addItem(item) { this.storage.set(item.name.toLowerCase(), item); this.save(); }
    updateQuantity(name, amt) {
        const item = this.storage.get(name.toLowerCase());
        if (item) { item.adjustQuantity(amt); this.save(); }
    }
}

class Parser {
    constructor(inv) { this.inventory = inv; this.state = 'IDLE'; this.pending = null; }
    process(input) {
        const msg = input.toLowerCase().trim();
        if (["list", "shopping"].includes(msg)) {
            let list = [];
            this.inventory.storage.forEach(i => { if(i.quantity <= i.threshold) list.push(i.name); });
            return list.length ? "Items to buy: " + list.join(", ") : "Pantry is full! ✅";
        }

        if (this.state === 'WAIT_CAT') {
            this.pending.category = input;
            this.state = 'WAIT_THR';
            return `Category set to ${input}. What is the min stock threshold?`;
        }
        if (this.state === 'WAIT_THR') {
            this.pending.threshold = parseFloat(input) || 1;
            this.inventory.addItem(this.pending);
            this.state = 'IDLE';
            return `Added ${this.pending.name} to the pantry!`;
        }

        let qty = parseFloat(msg.match(/\d+/) || [0]);
        let name = msg.replace(/\d+|bought|got|add|plus|used|ate|minus/g, "").trim();
        let isAdding = !["used", "ate", "minus"].some(w => msg.includes(w));

        if (this.inventory.storage.has(name)) {
            this.inventory.updateQuantity(name, isAdding ? qty : -qty);
            return `Updated ${name}.`;
        } else {
            this.pending = new Item(name, "Pending", qty, 1);
            this.state = 'WAIT_CAT';
            return `I don't know "${name}". Choose a category:`;
        }
    }
}

const myInv = new Inventory();
const myParser = new Parser(myInv);

function updateSidebar() {
    const list = document.getElementById('inventory-list');
    list.innerHTML = "";
    myInv.storage.forEach(item => {
        const meta = CONFIG.categories[item.category] || { em: "📦", col: "#ddd" };
        list.innerHTML += `
            <div class="item-card" style="border-left-color: ${meta.col}">
                <span style="font-size: 1.2rem; margin-right: 10px;">${meta.em}</span>
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600; text-transform: capitalize;">${item.name}</span>
                    <span style="font-size: 0.7rem; color: #94a3b8; text-transform: uppercase;">${item.category}</span>
                </div>
                <span class="qty-badge ${item.quantity <= item.threshold ? 'low' : ''}">${item.quantity}</span>
            </div>`;
    });
}

function sendMessage(override = null) {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    const text = override || input.value.trim();
    if (!text) return;

    document.getElementById('quick-actions').style.display = 'none';
    box.innerHTML += `<div class="msg-row user-row"><div class="avatar-circle">👤</div><div class="bubble user">${text}</div></div>`;
    
    const resp = myParser.process(text);
    setTimeout(() => {
        box.innerHTML += `<div class="msg-row bot-row"><div class="avatar-circle">🤖</div><div class="bubble bot">${resp}</div></div>`;
        if (myParser.state === 'WAIT_CAT') {
            const qa = document.getElementById('quick-actions');
            qa.innerHTML = "";
            Object.keys(CONFIG.categories).forEach(c => {
                const b = document.createElement('button'); b.className = 'action-btn'; b.innerText = c;
                b.onclick = () => sendMessage(c); qa.appendChild(b);
            });
            qa.style.display = 'flex';
        }
        box.scrollTop = box.scrollHeight;
    }, 300);

    input.value = "";
    updateSidebar();
    box.scrollTop = box.scrollHeight;
}

function clearAllData() {
    if(confirm("Are you sure? This will delete all your saved grocery items forever.")) {
        localStorage.clear();
        location.reload();
    }
}

// Initialization
document.getElementById('user-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMessage(); });
updateSidebar();
lucide.createIcons();
