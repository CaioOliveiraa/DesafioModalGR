document.getElementById("calculate-loan").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const admissionDate = document.getElementById("admission-date").value;
    const salary = parseFloat(document.getElementById("salary").value);
    const loanAmount = parseFloat(document.getElementById("loan-amount").value);
    const withdrawalMethod = document.getElementById("withdrawal-method").value;

    const dateParts = admissionDate.split('/');
    const time = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    const now = new Date();
    const years = now.getFullYear() - time.getFullYear();

    if (years >= 5) {
        if (loanAmount % 2 === 0) {
            if (loanAmount <= salary * 2) {
                const notes = calculateNotes(loanAmount, withdrawalMethod);
                displayLoanOptions(notes, withdrawalMethod);
            } else {
                displayMessage("Agradecemos seu interesse, mas você não atende aos requisitos mínimos do programa.");
            }
        } else {
            displayMessage("Insira um valor válido!");
        }
    } else {
        displayMessage("Agradecemos seu interesse, mas você não atende aos requisitos mínimos do programa.");
    }
});

function calculateNotes(amount, withdrawalMethod) {
    displayMessage("");
    const notes = {
        100: 0,
        50: 0,
        20: 0,
        10: 0,
        5: 0,
        2: 0
    };


    
    if (withdrawalMethod === "greater") {
        const availableNotes = [100, 50, 20, 10, 5, 2];
        for (const note of availableNotes) {
            while (amount >= note) {
                notes[note]++;
                amount -= note;
                if(amount == 6 || amount == 8){
                    console.log("foi")
                    while(amount >= 2){
                        notes[2]++;
                        amount -= 2;
                    }
                }
            }
        }
    } else if (withdrawalMethod === "lesser") {
        const availableNotes = [20, 10, 5, 2];
        for (const note of availableNotes) {
            while (amount >= note) {
                notes[note]++;
                amount -= note;
                while (amount >= note) {
                    notes[note]++;
                    amount -= note;
                    if(amount || 6 && amount == 8){
                        while(amount >= 2){
                            notes[2]++;
                            amount -= 2;
                        }
                    }
                }
            }
        } 
    } else if (withdrawalMethod === "half") {
        const halfAmount = amount / 2;
        const halfNotes1 = calculateNotes(halfAmount, "greater");
        const halfNotes2 = calculateNotes(halfAmount, "lesser");

        for (const note in halfNotes1) {
            halfNotes1[note] += halfNotes2[note];
        }
        return halfNotes1;
    }


    return notes;
}

function displayLoanOptions(notes, withdrawalMethod) {
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    const optionsDiv = document.getElementById("loan-options");
    optionsDiv.innerHTML = "";

    const headings = {
        greater: `${calculateTotalAmount(notes)} reais em notas de maior valor:`,
        lesser: `${calculateTotalAmount(notes)} reais em notas de menor valor:`,
        half: `${calculateTotalAmount(notes) / 2} reais em notas meio a meio:`
    };

    if (withdrawalMethod === "half") {
        const halfAmount = calculateTotalAmount(notes) / 2;
        const halfNotes1 = calculateNotes(halfAmount, "greater");
        const halfNotes2 = calculateNotes(halfAmount, "lesser");

        const noteHeading1 = document.createElement("h3");
        noteHeading1.textContent = `${headings[withdrawalMethod]}`;
        optionsDiv.appendChild(noteHeading1);

        const sortedHalfNotes1 = Object.entries(halfNotes1)
            .sort((a, b) => b[0] - a[0]);

        for (const [note, count] of sortedHalfNotes1) {
            if (count > 0) {
                const noteItem = document.createElement("li");
                noteItem.textContent = `➢ ${count} x ${note} reais;`;
                optionsDiv.appendChild(noteItem);
            }
        }

        const noteHeading2 = document.createElement("h3");
        noteHeading2.textContent = `${headings[withdrawalMethod]}`;
        optionsDiv.appendChild(noteHeading2);

        const sortedHalfNotes2 = Object.entries(halfNotes2)
            .sort((a, b) => b[0] - a[0]);

        for (const [note, count] of sortedHalfNotes2) {
            if (count > 0) {
                const noteItem = document.createElement("li");
                noteItem.textContent = `➢ ${count} x ${note} reais;`;
                optionsDiv.appendChild(noteItem);
            }
        }
    } else {
        const consideredNotes = (withdrawalMethod === "greater") ? [100, 50, 20, 10, 5, 2] : [20, 10, 5, 2];
        const noteHeading = document.createElement("h3");
        noteHeading.textContent = headings[withdrawalMethod];
        optionsDiv.appendChild(noteHeading);

        for (const noteValue of consideredNotes) {
            const amount = notes[noteValue];
            if (amount > 0) {
                const noteItem = document.createElement("li");
                noteItem.textContent = `${amount} x ${noteValue} reais`;
                optionsDiv.appendChild(noteItem);
            }
        }
    }
}

function calculateTotalAmount(notes) {
    let total = 0;
    for (const noteValue in notes) {
        total += noteValue * notes[noteValue];
    }
    return total;
}

function displayMessage(message) {
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.textContent = message;

    const isError = message !== "";

    errorMessageDiv.classList.toggle("hidden", !isError);

    if (!isError) {
        setTimeout(function () {
            errorMessageDiv.classList.add("hidden");
        }, 5000);
    }
}
