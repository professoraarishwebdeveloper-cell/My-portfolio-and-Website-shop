-- Profiles: users can read/update own profile, admins can read all
CREATE POLICY "_profiles_select_own" ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Projects: public read, admin write
CREATE POLICY "projects_public_read" ON projects FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "projects_anon_read" ON projects FOR SELECT
  TO anon USING (true);

CREATE POLICY "projects_admin_write" ON projects FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Certificates: public read
CREATE POLICY "certificates_public_read" ON certificates FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "certificates_anon_read" ON certificates FOR SELECT
  TO anon USING (true);

CREATE POLICY "certificates_admin_write" ON certificates FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Services: public read
CREATE POLICY "services_public_read" ON services FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "services_anon_read" ON services FOR SELECT
  TO anon USING (true);

CREATE POLICY "services_admin_write" ON services FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Features: public read
CREATE POLICY "features_public_read" ON features FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "features_anon_read" ON features FOR SELECT
  TO anon USING (true);

CREATE POLICY "features_admin_write" ON features FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Quotations: users manage own, admin sees all
CREATE POLICY "quotations_select_own" ON quotations FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "quotations_insert_own" ON quotations FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "quotations_update_own" ON quotations FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "quotations_delete_own" ON quotations FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Orders: users manage own, admin sees all
CREATE POLICY "orders_select_own" ON orders FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "orders_insert_own" ON orders FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "orders_update_own" ON orders FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Contacts: public can insert, admin reads all
CREATE POLICY "contacts_insert_public" ON contacts FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "contacts_insert_anon" ON contacts FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "contacts_admin_read" ON contacts FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "contacts_admin_update" ON contacts FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Journey entries: public read
CREATE POLICY "journey_public_read" ON journey_entries FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "journey_anon_read" ON journey_entries FOR SELECT
  TO anon USING (true);

CREATE POLICY "journey_admin_write" ON journey_entries FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Skills: public read
CREATE POLICY "skills_public_read" ON skills FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "skills_anon_read" ON skills FOR SELECT
  TO anon USING (true);

CREATE POLICY "skills_admin_write" ON skills FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Wishlists: users manage own
CREATE POLICY "wishlists_select_own" ON wishlists FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "wishlists_insert_own" ON wishlists FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "wishlists_delete_own" ON wishlists FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Notifications: users manage own, admin can create
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "notifications_insert_own" ON notifications FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "notifications_delete_own" ON notifications FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Invoices: users read own, admin manages all
CREATE POLICY "invoices_select_own" ON invoices FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "invoices_admin_all" ON invoices FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));