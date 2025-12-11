-- SQL to add images to production database
-- Run this in Supabase SQL Editor


-- Barcelona Superblocks: Urban Regeneration for Livable Streets
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '18d1d738-04d1-41a6-a1e3-eec58e01594c',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/barcelona_super_blocks.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Medellín Urban Acupuncture: Library Parks in Informal Settlements
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '29faea75-35b3-4c5f-8464-b30c7e52967d',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/medelin_urban_aculpunture.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Kigali Master Plan: Africa's Model Sustainable City
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '2d4add52-6461-42e1-84ec-e2d429608b7e',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/city_of_kigali.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Curitiba Bus Rapid Transit: Pioneering Sustainable Urban Mobility
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '592d5701-5e58-46b5-befa-404cdc15004a',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/curitiba_brazil_BRT.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Freiburg Solar City: Germany's Renewable Energy Showcase
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '61ae4233-fbaa-4dea-9857-b37356208d29',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/Freiburg-green-city-Sonnenschiff-scaled.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Portland Urban Growth Boundary: 50 Years of Smart Growth
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '2e7e3f68-5ca1-43f7-b358-faa8c03c10e1',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/portland_urban_growth_smart.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Bogotá Ciclovía: Weekly Car-Free Streets for 2 Million People
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '75a82257-7aa3-417e-ada5-2ac5c1d8443a',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/Ciclovia_bogota.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Tokyo Disaster Preparedness: Resilient Megacity Planning
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '7c70a62a-9894-4500-bab0-e142036f11db',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/Tokyo_resilience_project.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Vancouver Olympic Village: Carbon-Neutral Neighborhood Development
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '265ed568-6f5d-4dd0-873a-8f562dad42e8',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/Vancouver_Olympic_village.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Cape Town Day Zero: Water Crisis Management and Conservation
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '2fa515e4-ea63-4bb5-9b6b-2e6c934edf97',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/capetown_dayzero.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Seoul Digital Media City: Technology Hub and Urban Regeneration
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '35ae0a82-15cb-46da-9e7d-69e9e9c8331b',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/Seoul_digital_South-Korea-capital.png',
    0
)
ON CONFLICT DO NOTHING;

-- Curitiba Câmbio Verde - Green Exchange Waste-for-Food Program
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '4edc349d-cc8a-4e66-8015-63463d0dbe7a',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/curitiba_brazil_BRT.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Portland Green Streets - Sustainable Stormwater Management
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    'b83ceed8-4a25-4455-ae05-54876abba6c4',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/portland_green_streets.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Malmö Western Harbour Bo01 - Climate-Neutral Urban District
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '53c2fe70-778d-471e-a2a1-ce284f3d2cb3',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/200616_0022_malmo_drone-Vastra-hamnen-Foto-Apeloga-min-scaled.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Addis Ababa Light Rail Transit - Sub-Saharan Africa First LRT
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '0bb4393e-543d-408f-9d48-0352f1861a76',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/addis_ababa.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Masdar City - Zero-Carbon Eco-City in the Desert
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '1bbda14e-fa1e-46a5-9a61-4598da314769',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/masdar-city_1big.jpg',
    0
)
ON CONFLICT DO NOTHING;

-- Mexico City Cosecha de Lluvia - Rainwater Harvesting for Water Security
INSERT INTO project_images (id, project_id, image_url, display_order)
VALUES (
    gen_random_uuid(),
    '6ee66e10-ecc7-42e0-a5e8-70ac346fe8e8',
    'https://raw.githubusercontent.com/aikiesan/atlas_33/main/frontend/public/project_images/mexico_women_water_harvest.png',
    0
)
ON CONFLICT DO NOTHING;
