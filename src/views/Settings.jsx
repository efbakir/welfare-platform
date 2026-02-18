import PageHeader from "../components/layout/PageHeader";
import { Card, CardBody } from "../components/ui/Card";

export default function Settings() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your welfare preferences and account"
      />
      <Card>
        <CardBody>
          <p className="text-sm text-text-secondary">Settings and preferences will appear here.</p>
        </CardBody>
      </Card>
    </>
  );
}
