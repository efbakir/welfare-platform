import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import mockData from "../data/mock.json";

const eventMeta = {
  bt1: {
    date: "Friday, February 21",
    time: "6:30 PM - 8:30 PM",
    location: "Community Kitchen Studio, Building B",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80",
    attendees: ["MR", "AK", "JD", "LP", "SR", "TV", "MN", "CL"],
  },
  bt2: {
    date: "Saturday, March 7",
    time: "10:00 AM - 2:00 PM",
    location: "Riverside Park Grounds",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=80",
    attendees: ["JL", "HM", "DR", "EN", "TW"],
  },
  bt3: {
    date: "Thursday, February 27",
    time: "5:30 PM - 7:00 PM",
    location: "Wellbeing Lounge, 2nd Floor",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
    attendees: ["BT", "KO", "SR", "PM"],
  },
};

export default function SocialEventDetail() {
  const { eventId } = useParams();
  const event = mockData.benefitsThatBringTogether.find((item) => item.id === eventId);
  const [joined, setJoined] = useState(false);

  if (!event) {
    return (
      <Card>
        <CardBody className="p-6">
          <p className="text-sm text-text-secondary">Event not found.</p>
          <Link to="/" className="mt-3 inline-flex text-sm font-semibold text-blue hover:underline">
            Back to dashboard
          </Link>
        </CardBody>
      </Card>
    );
  }

  const meta = eventMeta[eventId] ?? eventMeta.bt1;
  const attendeeList = joined ? ["YOU", ...meta.attendees] : meta.attendees;

  return (
    <>
      <PageHeader
        eyebrow="Team experience"
        title={event.title}
        subtitle="Coordinate and join with your colleagues"
        actions={
          <Link to="/">
            <Button variant="outline" size="sm">Back to dashboard</Button>
          </Link>
        }
      />

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <img src={meta.image} alt={event.title} className="h-72 w-full object-cover" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardBody className="space-y-5 p-6">
            <p className="text-sm leading-6 text-text-secondary">{event.description}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">Date</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{meta.date}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">Time</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{meta.time}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-text-muted">Location</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{meta.location}</p>
              </div>
            </div>
            <Button variant="primary" size="md" onClick={() => setJoined(true)}>
              {joined ? "You are joining" : "Join event"}
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4 p-6">
            <h3 className="font-display text-lg font-bold text-text-primary">Who is already in</h3>
            <p className="text-sm text-text-secondary">Join your teammates and reserve a spot before it fills up.</p>
            <div className="flex flex-wrap gap-2">
              {attendeeList.map((attendee, index) => (
                <div
                  key={`${attendee}-${index}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-gradient-to-br from-blue to-pink text-xs font-bold text-white shadow-sm"
                  title={attendee}
                >
                  {attendee}
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-text-secondary">
              {attendeeList.length} colleagues already joined.
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
