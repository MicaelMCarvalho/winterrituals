CREATE TABLE festivals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL
);

INSERT INTO festivals (name, location, date, description, latitude, longitude) VALUES
    ('Mascaradas de Bragança', 'Bragança, Portugal', 'December 25 - January 6', 'Ancient winter masquerade traditions with elaborate masks and costumes.', 41.8061, -6.7567),
    ('Festa dos Rapazes', 'Vinhais, Portugal', 'December 25-26', 'Traditional winter festival with masked characters and ritual dances.', 41.8349, -7.0026);
