export async function getAllAccounts() {

    const response = await fetch('/api/accounts');
    return await response.json();
}

export async function createAccount(data) {
    const response = await fetch(`/api/account`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({account: data})
    })
    return await response.json();
}

export async function deleteAccount(accountId) {
    const response = await fetch(`/api/account/${accountId}`, {method: 'DELETE'})
    return await response.json();
}

export async function editAccount(data) {
    const response = await fetch(`/api/account`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({account: data})
    })
    return await response.json();
}

export async function fetchSettings() {

    const response = await fetch('/api/settings');
    return await response.json();
}
