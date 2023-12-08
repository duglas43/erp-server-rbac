INSERT INTO
    MediaFile (id, originalName, URL, createdAt, updatedAt)
VALUES
    (
        1,
        'firstFile.jpeg',
        'firstFile.jpeg',
        NOW(),
        NOW()
    ),
    (
        2,
        'secondFile.jpeg',
        'secondFile.jpeg',
        NOW(),
        NOW()
    ),
    (
        3,
        'thirdFile.jpeg',
        'thirdFile.jpeg',
        NOW(),
        NOW()
    ),
    (
        4,
        'fourthFile.jpeg',
        'fourthFile.jpeg',
        NOW(),
        NOW()
    ),
    (
        5,
        'fifthFile.jpeg',
        'fifthFile.jpeg',
        NOW(),
        NOW()
    );

INSERT INTO
    Characteristic (id, name, createdAt, updatedAt)
VALUES
    (1, 'Ширина упаковки', NOW(), NOW()),
    (2, 'Высота упаковки', NOW(), NOW()),
    (3, 'Длина упаковки', NOW(), NOW()),
    (
        4,
        'Дата регистрации сертификата/декларации',
        NOW(),
        NOW()
    ),
    (
        5,
        'Срок действия сертификата/декларации',
        NOW(),
        NOW()
    ),
    (6, 'Гарантийный срок', NOW(), NOW()),
    (7, 'Производитель', NOW(), NOW()),
    (8, 'Страна производства', NOW(), NOW()),
    (9, 'Материал', NOW(), NOW()),
    (10, 'Цвет', NOW(), NOW()),
    (11, 'Вес', NOW(), NOW()),
    (12, 'Ширина', NOW(), NOW()),
    (13, 'Высота', NOW(), NOW()),
    (14, 'Длина', NOW(), NOW()),
    (15, 'Вес в упаковке', NOW(), NOW()),
    (16, 'Количество в упаковке', NOW(), NOW());

INSERT INTO
    ProductCard (
        imtId,
        object,
        nmId,
        vendorCode,
        isProhibited,
        createdAt,
        updatedAt
    )
VALUES
    (
        1,
        'Рубашка Мужская',
        123213,
        'some_1',
        false,
        NOW(),
        NOW()
    ),
    (
        2,
        'Котёл печной',
        12355213,
        'some_2',
        false,
        NOW(),
        NOW()
    ),
    (
        3,
        'Перчатки',
        12332213,
        'some_3',
        false,
        NOW(),
        NOW()
    );

INSERT INTO
    ProductCardMediaFiles (
        productCardImtId,
        mediaFileId,
        createdAt,
        updatedAt
    )
VALUES
    (1, 1, NOW(), NOW()),
    (2, 2, NOW(), NOW()),
    (3, 3, NOW(), NOW());

INSERT INTO
    ProductCardCharacteristics (
        productCardImtId,
        characteristicId,
        value,
        createdAt,
        updatedAt
    )
VALUES
    (1, 1, '25', NOW(), NOW()),
    (1, 2, '40', NOW(), NOW()),
    (1, 3, '30', NOW(), NOW()),
    (1, 4, '25.10.1234', NOW(), NOW()),
    (1, 8, 'Китай', NOW(), NOW()),
    (2, 1, '25', NOW(), NOW()),
    (2, 2, '40', NOW(), NOW()),
    (2, 3, '30', NOW(), NOW()),
    (2, 4, '25.10.1234', NOW(), NOW()),
    (2, 8, 'Россия', NOW(), NOW()),
    (3, 1, '25', NOW(), NOW()),
    (3, 2, '40', NOW(), NOW()),
    (3, 3, '30', NOW(), NOW()),
    (3, 4, '25.10.1234', NOW(), NOW()),
    (3, 8, 'Россия', NOW(), NOW());