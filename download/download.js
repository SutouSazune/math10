var versions = [
    {
        version: '2025.1',
        date: '20-2-2025',
        name: 'MathSpeed',
        os: 'Android',
        app: '../app-versions/mathspeed-2025-1.apk'
    }
];

html = `
    <table>
        <tr>
            <th>Phiên bản</th>
            <th>Ngày phát hành</th>
            <th>Tên app</th>
            <th>Hệ điều hành</th>
            <th>Tải về</th>
        </tr>
`;

versions.forEach(items => {
    var { version, date, name, os, app } = items;
    html += `
        <tr>
            <td>${version}</td>
            <td>${date}</td>
            <td>${name}</td>
            <td>${os}</td>
            <td><a href="${app}" download>Download</a></td>
        </tr>
    `;
});

html += `
    </table>
`;



document.querySelector('.version-container').innerHTML = html;