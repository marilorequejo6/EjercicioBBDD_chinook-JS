const {db} = require('./datos'); // Importamos la conexión a la base de datos

// EJERCICIO 1: Customers donde City contiene 'on' y 'as'
db.all(`SELECT * FROM customers WHERE City LIKE ? OR City LIKE ?`, ['%on%', '%as%'], (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 1:", rows);
});

// EJERCICIO 2: Incremento 10% precio
db.all(`SELECT total*0.1+total AS 'Total Incrementado' FROM invoices`, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 2:", rows);
});

// EJERCICIO 3: Artistas/grupos con álbums
db.all(`SELECT albums.Title, artists.Name FROM albums, artists WHERE albums.ArtistId = artists.ArtistId`, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 3:", rows);
});

// EJERCICIO 4: Título, autor y playlist
db.all(`
    SELECT DISTINCT tracks.Name AS Title, artists.Name AS Artist, playlists.Name AS Playlist 
    FROM tracks 
    INNER JOIN albums ON tracks.AlbumId = albums.AlbumId
    INNER JOIN artists ON albums.ArtistId = artists.ArtistId
    INNER JOIN playlist_track ON tracks.TrackId = playlist_track.TrackId
    INNER JOIN playlists ON playlist_track.PlaylistId = playlists.PlaylistId
  `, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 4:", rows);
});

// EJERCICIO 5: IDs facturas de los clientes de Londres
db.all(`
    SELECT invoices.InvoiceId, customers.CustomerId, customers.City 
    FROM invoices 
    INNER JOIN customers ON invoices.CustomerId = customers.CustomerId 
    WHERE customers.City = ?
  `, ['London'], (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 5:", rows);
})

// EJERCICIO 6: Relacioens tablas customers, invoices y tracks
db.all(`
    SELECT customers.CustomerId, invoices.InvoiceId, invoice_items.TrackId, tracks.Name, playlist_track.PlaylistId 
    FROM customers
    INNER JOIN invoices ON customers.CustomerId = invoices.CustomerId
    INNER JOIN invoice_items ON invoices.InvoiceId = invoice_items.InvoiceId
    INNER JOIN tracks ON invoice_items.TrackId = tracks.TrackId
    INNER JOIN playlist_track ON tracks.TrackId = playlist_track.TrackId
  `, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 6:", rows);
});

// EJERCICIO 7: Suma facturas cliente Londres
db.get(`
    SELECT sum(i.Total) AS 'Total Londres' 
    FROM invoices i 
    INNER JOIN customers c ON i.CustomerId = c.CustomerId
    WHERE c.City = ?
  `, ['London'], (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 7:", rows);
});

// EJERCICIO 8: Número de álbums
db.get(`SELECT count(a.AlbumId) AS 'Número de álbumes' FROM albums a`, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 8:", rows);
});

// EJERCICIO 9: Número clientes por países
db.all(`
    SELECT c.Country AS 'País', count(c.CustomerId) AS 'Número de clientes' 
    FROM customers c
    GROUP BY c.Country
    ORDER BY c.Country
  `, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 9:", rows);
});

// EJERCICIO 10: Países con más de 3 clientes
db.all(`
    SELECT c.Country AS 'País', count(c.CustomerId) AS 'Número de clientes' 
    FROM customers c
    GROUP BY c.Country 
    HAVING count(c.CustomerId) > ?
    ORDER BY c.Country DESC
  `, [3], (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 10:", rows);
});

// EJERCICIO 11: Tipo de medio
db.all(`
    SELECT t.MediaTypeId AS 'ID medio', mt.Name AS 'Tipo de medio', t.Name AS 'Canción' 
    FROM tracks t
    INNER JOIN media_types mt ON t.MediaTypeId = mt.MediaTypeId
    INNER JOIN albums a ON t.AlbumId = a.AlbumId
    INNER JOIN artists ar ON a.ArtistId = ar.ArtistId
    WHERE ar.Name = ?
    ORDER BY t.Name
  `, ['AC/DC'], (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 11:", rows);
});

// EJERCICIO 12: Cliente con máxima factura
db.all(`
    SELECT c.CustomerId AS 'ID Cliente', c.Country AS 'País', max(i.Total) AS 'Factura máxima' 
    FROM invoices i
    INNER JOIN customers c ON i.CustomerId = c.CustomerId
    GROUP BY c.CustomerId
  `, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 12:", rows);
});

// EJERCICIO 13: Suma facturas por cliente
db.all(`
    SELECT i.CustomerId AS 'ID Cliente', c.Country AS 'País', sum(i.Total) AS 'Facturas' 
    FROM invoices i
    INNER JOIN customers c ON i.CustomerId = c.CustomerId
    GROUP BY i.CustomerId
    ORDER BY sum(i.Total)
  `, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 13:", rows);
});

// EJERCICIO 14: Ciudades empleados
db.all(`
    SELECT e.City AS 'Ciudad', count(e.EmployeeId) AS 'Número de empleados' 
    FROM employees e
    GROUP BY e.City
    ORDER BY count(e.EmployeeId)
  `, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 14:", rows);
});

// EJERCICIO 15: Artistas con álbums
db.all(`
    SELECT ar.Name AS 'Artista', a.Title AS 'Álbum' 
    FROM artists ar
    INNER JOIN albums a ON ar.ArtistId = a.ArtistId
    ORDER BY ar.Name, a.Title
  `, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 15:", rows);
});

// EJERCICIO 16: Media facturas por cliente
db.all(`
    SELECT i.CustomerId AS 'ID Cliente', c.Country AS 'País', avg(i.Total) AS 'Media facturas' 
    FROM invoices i
    INNER JOIN customers c ON i.CustomerId = c.CustomerId
    GROUP BY i.CustomerId
    ORDER BY c.Country, avg(i.Total)
  `, (err, rows) => {
    if (err) throw err;
    console.log("Ejercicio 16:", rows);
});
