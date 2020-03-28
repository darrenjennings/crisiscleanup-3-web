import { Database } from '@vuex-orm/core';
import User from '@/models/User';
import Worksite from '@/models/Worksite';
import Organization from '@/models/Organization';
import WorksiteRequest from '@/models/WorksiteRequest';
import Incident from '@/models/Incident';
import InvitationRequest from '@/models/InvitationRequest';
import Invitation from '@/models/Invitation';
import Location from '@/models/Location';
import Layer from '@/models/Layer';
import LocationType from '@/models/LocationType';
import Affiliate from '@/models/Affiliate';
import Role from '@/models/Role';
import Language from '@/models/Language';
import Agent from '@/models/Agent';
import UserRole from '@/models/UserRole';
import Pda from '@/models/Pda';
import PhoneOutbound from '@/models/PhoneOutbound';
import PhoneStatus from '@/models/PhoneStatus';

const database = new Database();

database.register(User, {});
database.register(Worksite, {});
database.register(Incident, {});
database.register(Organization, {});
database.register(InvitationRequest, {});
database.register(Invitation, {});
database.register(Location, {});
database.register(Layer, {});
database.register(WorksiteRequest, {});
database.register(LocationType, {});
database.register(Affiliate, {});
database.register(Language, {});
database.register(Role, {});
database.register(Agent, {});
database.register(UserRole, {});
database.register(Pda, {});
database.register(PhoneStatus, {});
database.register(PhoneOutbound, {});

export default database;
