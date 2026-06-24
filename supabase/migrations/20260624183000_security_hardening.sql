ALTER TABLE profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE contacts FORCE ROW LEVEL SECURITY;
ALTER TABLE quotations FORCE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;
ALTER TABLE invoices FORCE ROW LEVEL SECURITY;
ALTER TABLE notifications FORCE ROW LEVEL SECURITY;
ALTER TABLE wishlists FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "_profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

CREATE POLICY "profiles_select_own_or_admin" ON profiles
  FOR SELECT TO authenticated
  USING (
    auth.uid() = id OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own_or_admin" ON profiles
  FOR UPDATE TO authenticated
  USING (
    auth.uid() = id OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = id OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

DROP POLICY IF EXISTS "quotations_select_own" ON quotations;
DROP POLICY IF EXISTS "quotations_insert_own" ON quotations;
DROP POLICY IF EXISTS "quotations_update_own" ON quotations;
DROP POLICY IF EXISTS "quotations_delete_own" ON quotations;

CREATE POLICY "quotations_select_own_or_admin" ON quotations
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "quotations_insert_own_or_admin" ON quotations
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "quotations_update_own_or_admin" ON quotations
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  )
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "quotations_delete_own_or_admin" ON quotations
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

DROP POLICY IF EXISTS "orders_select_own" ON orders;
DROP POLICY IF EXISTS "orders_insert_own" ON orders;
DROP POLICY IF EXISTS "orders_update_own" ON orders;

CREATE POLICY "orders_select_own_or_admin" ON orders
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "orders_insert_own_or_admin" ON orders
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "orders_update_own_or_admin" ON orders
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  )
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

DROP POLICY IF EXISTS "contacts_insert_public" ON contacts;
DROP POLICY IF EXISTS "contacts_insert_anon" ON contacts;
DROP POLICY IF EXISTS "contacts_admin_read" ON contacts;
DROP POLICY IF EXISTS "contacts_admin_update" ON contacts;

CREATE POLICY "contacts_insert_authenticated" ON contacts
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "contacts_insert_anon" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "contacts_admin_read" ON contacts
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "contacts_admin_update" ON contacts
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

DROP POLICY IF EXISTS "wishlists_select_own" ON wishlists;
DROP POLICY IF EXISTS "wishlists_insert_own" ON wishlists;
DROP POLICY IF EXISTS "wishlists_delete_own" ON wishlists;

CREATE POLICY "wishlists_select_own_or_admin" ON wishlists
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "wishlists_insert_own" ON wishlists
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "wishlists_delete_own_or_admin" ON wishlists
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

DROP POLICY IF EXISTS "notifications_select_own" ON notifications;
DROP POLICY IF EXISTS "notifications_insert_own" ON notifications;
DROP POLICY IF EXISTS "notifications_update_own" ON notifications;
DROP POLICY IF EXISTS "notifications_delete_own" ON notifications;

CREATE POLICY "notifications_select_own_or_admin" ON notifications
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "notifications_insert_own_or_admin" ON notifications
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "notifications_update_own_or_admin" ON notifications
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  )
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "notifications_delete_own_or_admin" ON notifications
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

DROP POLICY IF EXISTS "invoices_select_own" ON invoices;
DROP POLICY IF EXISTS "invoices_admin_all" ON invoices;

CREATE POLICY "invoices_select_own_or_admin" ON invoices
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );

CREATE POLICY "invoices_admin_write" ON invoices
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles admin_profile WHERE admin_profile.id = auth.uid() AND admin_profile.role = 'admin')
  );
