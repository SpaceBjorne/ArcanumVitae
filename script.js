function saveEntry() {
    const creatureName = document.getElementById('creatureName').value;
    const type = document.getElementById('type').value;
    const bodyPart = document.getElementById('bodyPart').value;
    const effect = document.getElementById('effect').value;
    const notes = document.getElementById('notes').value;

    const entry = {
        creatureName,
        type,
        bodyPart,
        effect,
        notes
    };

    let entries = localStorage.getItem('grimoireEntries');
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }

    entries.push(entry);
    localStorage.setItem('grimoireEntries', JSON.stringify(entries));
    displayEntries();
    document.getElementById('grimoireForm').reset();
}

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('grimoireEntries')) || [];
    const entriesList = document.getElementById('entriesList');
    entriesList.innerHTML = '';

    entries.forEach((entry, index) => {
        const entryItem = document.createElement('li');
        entryItem.innerHTML = `
            <h3>${entry.creatureName}</h3>
            <p><strong>Type:</strong> ${entry.type}</p>
            <p><strong>Body Part:</strong> ${entry.bodyPart}</p>
            <p><strong>Effect:</strong> ${entry.effect}</p>
            <p><strong>Notes:</strong> ${entry.notes}</p>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
        entriesList.appendChild(entryItem);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('grimoireEntries'));
    entries.splice(index, 1);
    localStorage.setItem('grimoireEntries', JSON.stringify(entries));
    displayEntries();
}

document.addEventListener('DOMContentLoaded', displayEntries);
