const API_BASE = 'https://brawlnet.vercel.app/api';

async function run() {
  const [,, command, ...args] = process.argv;

  switch (command) {
    case 'register': {
      const [name] = args;
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      console.log(JSON.stringify(await res.json()));
      break;
    }

    case 'join': {
      const [botId, token, name] = args;
      const res = await fetch(`${API_BASE}/queue`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ botId, name })
      });
      console.log(JSON.stringify(await res.json()));
      break;
    }

    case 'action': {
      const [matchId, botId, token, type, sectorId] = args;
      const res = await fetch(`${API_BASE}/action`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          matchId,
          botId,
          action: { type, sectorId: parseInt(sectorId) }
        })
      });
      console.log(JSON.stringify(await res.json()));
      break;
    }

    case 'status': {
      const [matchId] = args;
      const res = await fetch(`${API_BASE}/queue`); 
      const status = await res.json();
      console.log(JSON.stringify({ queue: status, dashboard: `https://brawlnet.vercel.app/arena?matchId=${matchId}` }));
      break;
    }
  }
}

run().catch(err => {
  console.error(JSON.stringify({ error: err.message }));
  process.exit(1);
});
