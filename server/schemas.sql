
CREATE DATABASE Donateme;
USE Donateme;

-- 1.	Doner:
   CREATE TABLE Doner(
      Doner_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
      Name VARCHAR(30),
      Age INT,
      Gender VARCHAR(10),
      Contact_info VARCHAR(20),
      Blood_group VARCHAR(10),
      Medical_history VARCHAR(50),
      Resi_Date VARCHAR(20),
      Address VARCHAR(100),
      Count INT,
      password VARCHAR(10)
   );

-- 2.	Hospital:
   CREATE TABLE Hospital(
      Hospital_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
      Name VARCHAR(50),
      Location VARCHAR(100),
      Contact_info VARCHAR(20)
   );

-- 3.	Admin:
   CREATE TABLE Admin(
      Admin_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
      Name VARCHAR(30),
      Hospital_id VARCHAR(10),
      Contact_info VARCHAR(20),
      username VARCHAR(15),
      password VARCHAR(15),
      FOREIGN KEY (Hospital_id)
      REFERENCES Hospital(Hospital_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );


-- 4.	Blood Donation:
   CREATE TABLE Blood_Donation(
      Donation_id INT AUTO_INCREMENT PRIMARY KEY ,
      Doner_id VARCHAR(20),
      Hospital_id VARCHAR(20),
      Donation VARCHAR(15),
      Date VARCHAR(20),
      Blood_group VARCHAR(10),
      FOREIGN KEY(Doner_id) REFERENCES Doner(Doner_id)
      ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY(Hospital_id) REFERENCES Hospital(Hospital_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );


-- 5.	Blood Inventory:
   -- CREATE TABLE Blood_Inventory(
   --    Blood_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
   --    Blood_group VARCHAR(10),
   --    Available_unit INT,
   --    Expire_date VARCHAR(15),
   --    Hospital_id VARCHAR(10),
   --    Hospital_location VARCHAR(100),
   --    FOREIGN KEY(Hospital_id) REFERENCES Hospital(Hospital_id)
   --    ON DELETE CASCADE ON UPDATE CASCADE
   -- );

   CREATE TABLE Blood_Inventory(
      Hospital_id VARCHAR(10),
      Blood_id VARCHAR(10) NOT NULL,
      Blood_group VARCHAR(10),
      Available_unit INT,
      Expire_date VARCHAR(15),
      Hospital_location VARCHAR(100),
      FOREIGN KEY(Hospital_id) REFERENCES Hospital(Hospital_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );

-- 5.5 Appointmenet:
-- CREATE TABLE Appointment(
--    Appointment_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--    Doner_id VARCHAR(10),
--    Hospital_id VARCHAR(10),
--    FOREIGN KEY(Hospital_id) REFERENCES Hospital(Hospital_id)
--    ON DELETE CASCADE ON UPDATE CASCADE,
--    FOREIGN KEY(Doner_id) REFERENCES Doner(Doner_id)
--    ON DELETE CASCADE ON UPDATE CASCADE
-- );


-- 6.	User Query:
   CREATE TABLE Query(
      Query_id INT PRIMARY KEY AUTO_INCREMENT,
      Name VARCHAR(30),
      Mobile_no VARCHAR(10),
      Text VARCHAR(100),
      date VARCHAR(20),
      Query_status VARCHAR(10),
      Hospital_name VARCHAR(30),
      Hospital_id VARCHAR(10),
      FOREIGN KEY(Hospital_id) REFERENCES Hospital(Hospital_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );


-- 7.	Query Status:
   CREATE TABLE Query_Status(
      Query_id INT NOT NULL UNIQUE,
      Status VARCHAR(10),
      FOREIGN KEY(Query_id) REFERENCES Query(Query_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );


-- 8. Medical History of Doner
   CREATE TABLE Medical_history(
      Doner_id VARCHAR(10) NOT NULL,
      Date VARCHAR(20),
      FOREIGN KEY(doner_id) REFERENCES doner(donar_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );


-- **************** PROCEDURE ****************
   DELIMITER //
   CREATE PROCEDURE init_blood_inventory(
      IN hospital_id VARCHAR(10),
      IN blood_id VARCHAR(10),
      IN blood_group VARCHAR(10),
      IN Available_unit INT,
      IN Hospital_location VARCHAR(100)
   )
   BEGIN
      INSERT INTO blood_inventory (hospital_id, blood_id, blood_group, Available_unit, Hospital_location)
      VALUES (hospital_id, blood_id, blood_group, units, Hospital_location);
   END;
   //
   DELIMITER ;




-- ****************TRIGGERS****************

-- 0. Update Doner blood donation count AFTER inserting blood donation record
   DELIMITER //
   CREATE TRIGGER update_donar_count
   AFTER INSERT ON blood_donation
   FOR EACH ROW
   BEGIN
      UPDATE Doner
      SET count = count + 1
      WHERE doner_id = NEW.doner_id;
   END;
   //
   DELIMITER ;


-- 1. Update Blood Inventory AFTER inserting Blood record
   DELIMITER //
   CREATE TRIGGER update_add_blood_inventort
   AFTER INSERT ON blood_donation
   FOR EACH ROW
   BEGIN
      UPDATE Blood_inventory
      SET Available_unit = Available_unit + 1
      WHERE Blood_group = NEW.Blood_group;
   END;
   //
   DELIMITER ;


-- 2. AFTER Inserting Query Set Query Status by "Pending"
   DELIMITER //
   CREATE TRIGGER init_Query_Status
   AFTER INSERT ON Query
   FOR EACH ROW
   BEGIN
      INSERT INTO Query_Status(Query_id, status, Blood_group) VALUE(new.Query_id, "pending", new.Blood_group);
   END;
   //
   DELIMITER ;

   
-- 3. AFTER Updation of Query Status Reduce Units of blood from Blood Inventory
   DELIMITER //
   CREATE TRIGGER update_reduce_blood_inventory
   AFTER UPDATE ON Query_Status
   FOR EACH ROW 
   BEGIN
      UPDATE Blood_Inventory
      SET Available_unit = Available_unit - 1
      WHERE Blood_group = new.Blood_group;
   END;
   //
   DELIMITER ;

-- 4. Update Medical history AFTER Updtion of blood donation
   DELIMITER //
   CREATE TRIGGER update_medical_history
   AFTER UPDATE blood_donation
   FOR EACH ROW
   BEGIN
      insert into Medical_history
      SET date = new.date
   END;
   //
   DELIMITER ;




--- CROSS JOIN

   SELECT
      H.Name AS Hospital_Name,
      H.Location AS Hospital_Location,
      BI.Available_unit,
      BI.Blood_group
   FROM
      Hospital H
   JOIN
      Blood_Inventory BI ON H.Hospital_id = BI.Hospital_id
   WHERE
      H.Location LIKE %'{pincode}' AND Available_unit>=1;
 



 ---****************** CURSOR ***************************** 
 delimiter //

CREATE PROCEDURE doner_prced()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE doner_id_val INT;
    DECLARE Name_val VARCHAR(255);
    DECLARE Contact_info_val VARCHAR(255);
    DECLARE count_val INT;

    DECLARE doner_curser CURSOR FOR
        SELECT donar_id, Name, Contact_info, count
        FROM doner
        WHERE count > 5;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN doner_curser;
    doner_loop: LOOP
        FETCH doner_curser INTO doner_id_val, Name_val, Contact_info_val, count_val;

        IF done THEN
            LEAVE doner_loop;
        END IF;

        -- PRINT doner_id_val, Name_val, Contact_info_val, count_val;
    END LOOP;
    CLOSE doner_curser;
END 
//
delimiter ;


--2
delimiter //
CREATE PROCEDURE unit_available(IN Hospital_id_in VARCHAR(10), IN Blood_group_in VARCHAR(10))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE Blood_group_val VARCHAR(10);
    DECLARE Available_unit_val VARCHAR(255);

    DECLARE unit_available_cursor CURSOR FOR
        SELECT Blood_group, Available_unit
        FROM Blood_Inventory
        WHERE Blood_group = Blood_group_in
        AND  Hospital_id = Hospital_id_in;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN unit_available_cursor;
    Available_unit_loop: LOOP
        FETCH unit_available_cursor INTO Blood_group_val, Available_unit_val;
        IF done THEN
            LEAVE doner_loop;
        END IF;

        -- PRINT doner_id_val, Name_val, Contact_info_val, count_val;
    END LOOP;
    CLOSE doner_curser;
END 
//
delimiter ;