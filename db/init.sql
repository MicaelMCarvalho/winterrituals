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
    ('Festa dos Caretos de Podence', 'Podence, Portugal', 'Carnival period', 'Famous carnival featuring Caretos in colorful fringed suits and wooden masks, performing ritualistic dances and chasing young women with cowbells.', 41.5384, -6.9847),
    ('Entrudo de Lazarim', 'Lazarim, Portugal', 'Carnival period', 'Ancient carnival celebration known for its wooden carved masks and satirical testaments read by masked figures representing the elderly.', 41.0047, -7.8543),
    ('Caretos de Ousilhão', 'Ousilhão, Portugal', 'December 25-26', 'Winter solstice celebration with masked figures in colorful costumes performing ancient purification rituals and traditional dances.', 41.8523, -6.9914),
    ('Zangarrón de Montamarta', 'Montamarta, Spain', 'January 1 and 6', 'Traditional winter masquerade featuring the Zangarrón character in a distinctive mask with horns, who chases villagers in a purification ritual.', 41.6453, -5.8878),
    ('Boteiros de Viana do Bolo', 'Viana do Bolo, Spain', 'Carnival period', 'Winter festival featuring the Boteiros, masked figures in elaborate costumes with tall pointed hats, performing ritual jumps and dances.', 42.1757, -7.1088),
    ('Caretos de Vinhais', 'Vinhais, Portugal', 'December 25-26 and Carnival', 'Traditional masked figures in colorful suits with brass bells, performing ritual persecution and purification ceremonies.', 41.8349, -7.0026),
    ('Mascarada de los Sidros', 'Valdesoto, Spain', 'December-January', 'Ancient winter masquerade with masked characters including los Sidros and la Madama, performing traditional dances and social satire.', 43.3553, -5.6651),
    ('Tafarróns de Pozuelo de Tábara', 'Pozuelo de Tábara, Spain', 'December 26', 'Winter festival featuring masked Tafarróns in colorful attire with cowbells, performing purification rituals and traditional persecutions.', 41.7183, -5.9675),
    ('Festa dos Chocalheiros', 'Bemposta, Portugal', 'Christmas to Epiphany', 'Winter masquerade featuring masked figures with large cowbells, performing traditional dances and purification rituals.', 41.3119, -6.5036),
    ('Mascarada de la Vijanera', 'Silió, Spain', 'First Sunday of year', 'One of the first masquerades of the year featuring over 60 different character types with intricate masks, representing the battle between good and evil.', 43.1521, -4.0464);
