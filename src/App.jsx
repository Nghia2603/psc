import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Wallet,
  Users,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRightCircle,
  Download,
  RotateCcw,
  Trash2,
  Edit3,
  TrendingUp,
  DollarSign,
  Calendar,
  Briefcase,
  CheckSquare,
  X,
  ChevronRight,
  SlidersHorizontal,
  Building2,
  Receipt,
  UserCheck,
  AlertCircle,
  Sparkles,
  UploadCloud,
  FileCheck2,
  Loader2,
  Check,
  FileSpreadsheet,
  Layers,
  Wand2
} from 'lucide-react';

// ============================================================================
// HÀM TIỆN ÍCH & ĐỊNH DẠNG (UTILS & FORMATTERS)
// ============================================================================

const formatVND = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatCompactVND = (amount) => {
  if (!amount) return '0 đ';
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(2)} Tỷ`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)} Tr`;
  }
  return formatVND(amount);
};

const formatDateVN = (dateStr) => {
  if (!dateStr) return '---';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
};

// Tính số ngày chênh lệch từ hôm nay đến ngày mục tiêu
const getDaysDiff = (targetDateStr, baseDateStr = '2026-11-13') => {
  const target = new Date(targetDateStr);
  const base = new Date(baseDateStr);
  target.setHours(0, 0, 0, 0);
  base.setHours(0, 0, 0, 0);
  return Math.round((target - base) / (1000 * 60 * 60 * 24));
};

// Mẫu văn bản hợp đồng để test nhanh tính năng AI trích xuất
const SAMPLE_CONTRACT_TEXTS = [
  {
    id: 'sample-rtg',
    title: 'HĐ Nâng cấp Hệ thống Điện & PLC Cẩu RTG',
    badge: 'Cảng biển • 1.65 Tỷ',
    content: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
---
HỢP ĐỒNG KINH TẾ SỐ: HĐ-2026/029-RTG
V/v: Cung cấp vật tư và thi công nâng cấp hệ thống điều khiển PLC Siemens S7-1500 & Biến tần cho 02 Cẩu khung RTG tại Cảng Cát Lái.
Ngày ký: 13/11/2026

BÊN A (CHỦ ĐẦU TƯ): Công ty Cổ phần Khai thác Cảng Container Sài Gòn
BÊN B (NHÀ THẦU): Công ty Kỹ thuật TechConstruct

ĐIỀU 1: PHẠM VI CÔNG VIỆC
1. Khảo sát hiện trạng tủ điện cẩu RTG-04 và RTG-05, lập bản vẽ thiết kế chi tiết Shopdrawing (từ 14/11/2026 đến 20/11/2026).
2. Nhập khẩu và tập kết bộ điều khiển PLC Siemens S7-1500, biến tần Sinamics và cảm biến chống lắc (từ 18/11/2026 đến 02/12/2026).
3. Thi công tháo dỡ tủ cũ, lắp đặt tủ điều khiển mới, kéo cáp tín hiệu Profinet tại bãi cảng (từ 03/12/2026 đến 16/12/2026).
4. Lập trình phần mềm điều khiển, hiệu chỉnh chống lắc, chạy thử tải và nghiệm thu bàn giao (từ 17/12/2026 đến 24/12/2026).

ĐIỀU 2: GIÁ TRỊ HỢP ĐỒNG VÀ THANH TOÁN
- Tổng giá trị hợp đồng (trước VAT): 1.650.000.000 VNĐ (Một tỷ sáu trăm năm mươi triệu đồng).
- Tạm ứng đợt 1: 35% giá trị hợp đồng ngay sau khi ký.
- Thanh toán đợt 2: 45% sau khi giao thiết bị đến chân công trình.
- Quyết toán đợt 3: 20% sau khi nghiệm thu bàn giao hoàn thành ngày 24/12/2026.
- Dự toán chi phí nội bộ mục tiêu: Vật tư thiết bị chính 920.000.000 VNĐ, Nhân công & ca đêm 165.000.000 VNĐ, Vận chuyển & thuê cẩu phụ trợ 45.000.000 VNĐ, Dự phòng 30.000.000 VNĐ.`
  },
  {
    id: 'sample-warehouse',
    title: 'HĐ Lắp đặt Kho tự động & Băng tải',
    badge: 'Logistics • 1.28 Tỷ',
    content: `HỢP ĐỒNG THI CÔNG LẮP ĐẶT HỆ THỐNG SỐ: HĐ-2026/031-WMS
Ngày ký: 13/11/2026
Chủ đầu tư: Công ty TNHH Thương mại Điện tử VinaExpress
Địa điểm thi công: KCN Tân Bình, TP.HCM

Nội dung gói thầu: Thiết kế, chế tạo và lắp đặt hệ thống băng tải phân loại hàng hóa tự động 3 làn kết hợp máy quét mã vạch công nghiệp.
Thời gian thực hiện: Từ 15/11/2026 đến 20/12/2026.
Các giai đoạn triển khai chính:
- Giai đoạn 1: Đo đạc mặt bằng kho & Thiết kế cơ khí - điện điều khiển (15/11/2026 - 21/11/2026).
- Giai đoạn 2: Mua sắm động cơ giảm tốc SEW, khung nhôm định hình, cảm biến quang & đầu đọc Barcode (20/11/2026 - 01/12/2026).
- Giai đoạn 3: Lắp đặt cơ khí tuyến băng tải dài 65m và đấu nối tủ điện phân phối (02/12/2026 - 13/12/2026).
- Giai đoạn 4: Tích hợp phần mềm kết nối WMS, chạy thử tốc độ cao và bàn giao (14/12/2026 - 20/12/2026).

Giá trị hợp đồng: 1.280.000.000 VNĐ.
Thanh toán: Tạm ứng 40% khi ký hợp đồng, 60% khi nghiệm thu bàn giao.
Ngân sách dự kiến: Thiết bị & cơ khí 710.000.000 VNĐ, Nhân công lắp đặt 135.000.000 VNĐ, Vận chuyển 25.000.000 VNĐ, Dự phòng 20.000.000 VNĐ.`
  },
  {
    id: 'sample-iot',
    title: 'HĐ Hệ thống Giám sát Nhiên liệu IoT',
    badge: 'Vận tải • 760 Triệu',
    content: `HỢP ĐỒNG CUNG CẤP GIẢI PHÁP SỐ: HĐ-2026/034-IOT
Ngày ký: 13/11/2026
Khách hàng: Tổng Công ty Vận tải Thủy bộ Phương Nam
Giá trị hợp đồng trọn gói: 760.000.000 VNĐ (Bảy trăm sáu mươi triệu đồng).
Điều khoản thanh toán: Tạm ứng 30% sau ký HĐ, 70% sau khi nghiệm thu toàn bộ 25 phương tiện.

Phạm vi công việc & Tiến độ (14/11/2026 - 12/12/2026):
1. Khảo sát bồn dầu 25 sà lan & tàu kéo, chốt phương án lắp cảm biến điện dung (14/11/2026 - 18/11/2026).
2. Nhập cảm biến mức nhiên liệu độ chính xác cao, bộ thu phát GPS/4G và thiết bị chống cháy nổ (17/11/2026 - 25/11/2026).
3. Thi công lắp đặt cảm biến tại bến tàu & hiệu chuẩn bảng dung tích bồn (26/11/2026 - 07/12/2026).
4. Cấu hình Dashboard cảnh báo rút dầu bất thường trên Cloud và bàn giao (08/12/2026 - 12/12/2026).
Chi phí dự toán: Thiết bị IoT & cảm biến 410.000.000 VNĐ, Công tác phí & lắp đặt lưu động 95.000.000 VNĐ, Vận chuyển 15.000.000 VNĐ.`
  }
];

// ============================================================================
// DỮ LIỆU MẪU THỰC TẾ CHO CÔNG TY KỸ THUẬT / THI CÔNG 6 NHÂN SỰ
// ============================================================================

const TODAY_STR = '2026-11-13';

const INITIAL_TEAM = [
  {
    id: 'emp-1',
    name: 'Nguyễn Minh Quân',
    role: 'Giám đốc Dự án (PM)',
    avatar: 'MQ',
    color: 'bg-blue-600',
    phone: '0903 112 456',
    capacity: 5,
  },
  {
    id: 'emp-2',
    name: 'Trần Hoàng Nam',
    role: 'Kỹ sư Trưởng (Hệ thống & Điện)',
    avatar: 'HN',
    color: 'bg-emerald-600',
    phone: '0918 445 789',
    capacity: 5,
  },
  {
    id: 'emp-3',
    name: 'Lê Quốc Bảo',
    role: 'Kỹ sư Hiện trường / Giám sát',
    avatar: 'QB',
    color: 'bg-indigo-600',
    phone: '0938 776 321',
    capacity: 5,
  },
  {
    id: 'emp-4',
    name: 'Phạm Tuấn Kiệt',
    role: 'Kỹ sư Thi công & Tích hợp',
    avatar: 'TK',
    color: 'bg-amber-600',
    phone: '0977 889 102',
    capacity: 5,
  },
  {
    id: 'emp-5',
    name: 'Vũ Thị Mai Anh',
    role: 'Kế toán Dự án & Mua sắm',
    avatar: 'MA',
    color: 'bg-rose-600',
    phone: '0909 554 332',
    capacity: 4,
  },
  {
    id: 'emp-6',
    name: 'Đặng Văn Hùng',
    role: 'Kỹ thuật viên Cơ điện & Bảo trì',
    avatar: 'VH',
    color: 'bg-teal-600',
    phone: '0912 667 890',
    capacity: 5,
  },
];

const INITIAL_CONTRACTS = [
  {
    id: 'hd-01',
    code: 'HĐ-2026/018-ELV',
    name: 'Thi công Hệ thống Điện nhẹ & Camera AI Nhà máy Bình Dương',
    client: 'Công ty TNHH Sản xuất Linh kiện Á Châu',
    value: 1450000000,
    signedDate: '2026-10-05',
    status: 'Đang triển khai', // Mới ký, Đang triển khai, Nghiệm thu, Thanh lý
    paymentStage: 'Đợt 1 (70%)', // Tạm ứng, Đợt 1, Quyết toán
    paidAmount: 1015000000,
    convertedProjectId: 'prj-01',
    notes: 'Đã tạm ứng 30% và thanh toán đợt 1 sau khi tập kết thiết bị.',
  },
  {
    id: 'hd-02',
    code: 'HĐ-2026/022-HVAC',
    name: 'Cải tạo Hệ thống Điều hòa & Tự động hóa BMS Văn phòng Q.1',
    client: 'Tập đoàn Bất động sản Sao Việt',
    value: 820000000,
    signedDate: '2026-10-20',
    status: 'Đang triển khai',
    paymentStage: 'Tạm ứng (40%)',
    paidAmount: 328000000,
    convertedProjectId: 'prj-02',
    notes: 'Thi công ngoài giờ hành chính và cuối tuần theo quy định tòa nhà.',
  },
  {
    id: 'hd-03',
    code: 'HĐ-2026/025-SOLAR',
    name: 'Lắp đặt Điện mặt trời áp mái 150kWp Kho vận Long An',
    client: 'Công ty Cổ phần Logistics Miền Nam',
    value: 1980000000,
    signedDate: '2026-11-08',
    status: 'Mới ký',
    paymentStage: 'Tạm ứng (30%)',
    paidAmount: 594000000,
    convertedProjectId: null, // Chưa chuyển đổi thành dự án để user trải nghiệm tính năng
    notes: 'Chờ ban giám đốc duyệt khởi tạo dự án triển khai tuần tới.',
  },
  {
    id: 'hd-04',
    code: 'HĐ-2026/011-NET',
    name: 'Hạ tầng Mạng Core & Phòng Server Trung tâm Dữ liệu',
    client: 'Bệnh viện Đa khoa Quốc tế Tâm An',
    value: 640000000,
    signedDate: '2026-08-15',
    status: 'Nghiệm thu',
    paymentStage: 'Quyết toán (100%)',
    paidAmount: 640000000,
    convertedProjectId: 'prj-03',
    notes: 'Đang hoàn tất hồ sơ hoàn công và xuất hóa đơn đợt cuối.',
  },
];

const INITIAL_PROJECTS = [
  {
    id: 'prj-01',
    contractId: 'hd-01',
    code: 'DA-01-BD',
    name: 'Hệ thống Điện nhẹ & Camera AI Nhà máy Bình Dương',
    client: 'Công ty TNHH Sản xuất Linh kiện Á Châu',
    contractValue: 1450000000,
    plannedBudget: 1020000000, // Ngân sách dự toán (mục tiêu lợi nhuận ~30%)
    startDate: '2026-10-08',
    endDate: '2026-11-28',
    managerId: 'emp-1',
    status: 'Đang thi công',
  },
  {
    id: 'prj-02',
    contractId: 'hd-02',
    code: 'DA-02-Q1',
    name: 'Hệ thống Điều hòa & BMS Văn phòng Sao Việt Q.1',
    client: 'Tập đoàn Bất động sản Sao Việt',
    contractValue: 820000000,
    plannedBudget: 580000000,
    startDate: '2026-10-22',
    endDate: '2026-12-10',
    managerId: 'emp-2',
    status: 'Đang thi công',
  },
  {
    id: 'prj-03',
    contractId: 'hd-04',
    code: 'DA-03-TA',
    name: 'Hạ tầng Mạng Core & Phòng Server BV Tâm An',
    client: 'Bệnh viện Đa khoa Quốc tế Tâm An',
    contractValue: 640000000,
    plannedBudget: 450000000,
    startDate: '2026-08-20',
    endDate: '2026-11-10',
    managerId: 'emp-1',
    status: 'Hoàn thành',
  },
];

const INITIAL_TASKS = [
  // Dự án 1: Nhà máy Bình Dương
  {
    id: 'tsk-101',
    projectId: 'prj-01',
    phase: '1. Khảo sát & Thiết kế',
    name: 'Khảo sát mặt bằng xưởng & Lập bản vẽ Shopdrawing',
    assigneeId: 'emp-2',
    startDate: '2026-10-08',
    deadline: '2026-10-16',
    progress: 100,
    status: 'Hoàn thành',
  },
  {
    id: 'tsk-102',
    projectId: 'prj-01',
    phase: '2. Mua sắm vật tư/thiết bị',
    name: 'Đặt hàng Server AI, Camera Hikvision & Cáp quang',
    assigneeId: 'emp-5',
    startDate: '2026-10-15',
    deadline: '2026-10-28',
    progress: 100,
    status: 'Hoàn thành',
  },
  {
    id: 'tsk-103',
    projectId: 'prj-01',
    phase: '3. Thi công lắp đặt',
    name: 'Kéo cáp trục chính & Lắp đặt máng cáp nhà xưởng A-B',
    assigneeId: 'emp-3',
    startDate: '2026-10-29',
    deadline: '2026-11-15', // Sắp đến hạn (còn 2 ngày so với 13/11)
    progress: 85,
    status: 'Đang làm',
  },
  {
    id: 'tsk-104',
    projectId: 'prj-01',
    phase: '3. Thi công lắp đặt',
    name: 'Gắn thiết bị Camera AI & Đấu nối tủ Rack trung tâm',
    assigneeId: 'emp-4',
    startDate: '2026-11-10',
    deadline: '2026-11-19', // Sắp đến hạn (còn 6 ngày)
    progress: 45,
    status: 'Đang làm',
  },
  {
    id: 'tsk-105',
    projectId: 'prj-01',
    phase: '4. Chạy thử & Bàn giao',
    name: 'Cấu hình phần mềm nhận diện AI, Nghiệm thu & Bàn giao',
    assigneeId: 'emp-2',
    startDate: '2026-11-20',
    deadline: '2026-11-28',
    progress: 0,
    status: 'Chưa làm',
  },

  // Dự án 2: Văn phòng Q.1 (Có 1 đầu việc bị trễ hạn & vượt ngân sách nhẹ để cảnh báo)
  {
    id: 'tsk-201',
    projectId: 'prj-02',
    phase: '1. Khảo sát & Thiết kế',
    name: 'Đo đạc tải lạnh & Thiết kế sơ đồ nguyên lý tủ DDC BMS',
    assigneeId: 'emp-2',
    startDate: '2026-10-22',
    deadline: '2026-10-30',
    progress: 100,
    status: 'Hoàn thành',
  },
  {
    id: 'tsk-202',
    projectId: 'prj-02',
    phase: '2. Mua sắm vật tư/thiết bị',
    name: 'Nhập bộ điều khiển trung tâm Siemens & Cảm biến nhiệt',
    assigneeId: 'emp-5',
    startDate: '2026-10-28',
    deadline: '2026-11-11', // Quá hạn 2 ngày!
    progress: 90,
    status: 'Trễ hạn',
  },
  {
    id: 'tsk-203',
    projectId: 'prj-02',
    phase: '3. Thi công lắp đặt',
    name: 'Thi công ống đồng, bảo ôn & Lắp đặt dàn lạnh tầng 5-8',
    assigneeId: 'emp-6',
    startDate: '2026-11-05',
    deadline: '2026-11-18', // Sắp đến hạn (còn 5 ngày)
    progress: 60,
    status: 'Đang làm',
  },
  {
    id: 'tsk-204',
    projectId: 'prj-02',
    phase: '3. Thi công lắp đặt',
    name: 'Lập trình giao diện giám sát BMS & Tích hợp cảnh báo',
    assigneeId: 'emp-4',
    startDate: '2026-11-19',
    deadline: '2026-12-02',
    progress: 0,
    status: 'Chưa làm',
  },
  {
    id: 'tsk-205',
    projectId: 'prj-02',
    phase: '4. Chạy thử & Bàn giao',
    name: 'Cân chỉnh lưu lượng gió, Đào tạo vận hành & Hoàn công',
    assigneeId: 'emp-1',
    startDate: '2026-12-03',
    deadline: '2026-12-10',
    progress: 0,
    status: 'Chưa làm',
  },

  // Dự án 3: Bệnh viện Tâm An (Đã hoàn thành)
  {
    id: 'tsk-301',
    projectId: 'prj-03',
    phase: '1. Khảo sát & Thiết kế',
    name: 'Thiết kế kiến trúc mạng Core Redundancy & Tủ Server',
    assigneeId: 'emp-2',
    startDate: '2026-08-20',
    deadline: '2026-09-02',
    progress: 100,
    status: 'Hoàn thành',
  },
  {
    id: 'tsk-302',
    projectId: 'prj-03',
    phase: '3. Thi công lắp đặt',
    name: 'Lắp đặt Switch Cisco Core, Firewall & Hệ thống UPS',
    assigneeId: 'emp-3',
    startDate: '2026-09-15',
    deadline: '2026-10-25',
    progress: 100,
    status: 'Hoàn thành',
  },
  {
    id: 'tsk-303',
    projectId: 'prj-03',
    phase: '4. Chạy thử & Bàn giao',
    name: 'Kiểm thử tải chịu lỗi (Failover) & Bàn giao tài liệu',
    assigneeId: 'emp-1',
    startDate: '2026-10-26',
    deadline: '2026-11-10',
    progress: 100,
    status: 'Hoàn thành',
  },
];

const INITIAL_EXPENSES = [
  // Chi phí Dự án 1
  {
    id: 'exp-101',
    projectId: 'prj-01',
    date: '2026-10-18',
    category: 'Vật tư/Thiết bị',
    amount: 640000000,
    requesterId: 'emp-5',
    status: 'Đã duyệt',
    note: 'HĐ VAT #00412 - Thanh toán lô Camera AI & Server lưu trữ',
  },
  {
    id: 'exp-102',
    projectId: 'prj-01',
    date: '2026-10-26',
    category: 'Vật tư/Thiết bị',
    amount: 145000000,
    requesterId: 'emp-3',
    status: 'Đã duyệt',
    note: 'Cáp quang 8FO, ống luồn dây điện & vật tư phụ tại Bình Dương',
  },
  {
    id: 'exp-103',
    projectId: 'prj-01',
    date: '2026-11-04',
    category: 'Vận chuyển',
    amount: 18500000,
    requesterId: 'emp-6',
    status: 'Đã duyệt',
    note: 'Thuê xe tải cẩu vận chuyển tủ Rack và thang cáp xuống KCN VSIP',
  },
  {
    id: 'exp-104',
    projectId: 'prj-01',
    date: '2026-11-11',
    category: 'Nhân công/Công tác phí',
    amount: 42000000,
    requesterId: 'emp-3',
    status: 'Đã duyệt',
    note: 'Tạm ứng lương nhân công thời vụ kéo cáp & công tác phí đội kỹ thuật',
  },
  {
    id: 'exp-105',
    projectId: 'prj-01',
    date: '2026-11-13',
    category: 'Thuê ngoài',
    amount: 35000000,
    requesterId: 'emp-4',
    status: 'Chờ duyệt',
    note: 'Thuê xe nâng người cắt kéo thi công trên cao 12m (tuần 2)',
  },

  // Chi phí Dự án 2 (Vượt ngân sách 580tr -> Đang ở mức 598tr để test cảnh báo vượt ngân sách)
  {
    id: 'exp-201',
    projectId: 'prj-02',
    date: '2026-10-30',
    category: 'Vật tư/Thiết bị',
    amount: 395000000,
    requesterId: 'emp-5',
    status: 'Đã duyệt',
    note: 'Bộ điều khiển trung tâm BMS Siemens & Van điện từ',
  },
  {
    id: 'exp-202',
    projectId: 'prj-02',
    date: '2026-11-06',
    category: 'Vật tư/Thiết bị',
    amount: 128000000,
    requesterId: 'emp-6',
    status: 'Đã duyệt',
    note: 'Ống đồng Thái Lan, bảo ôn Superlon & gas lạnh R410A',
  },
  {
    id: 'exp-203',
    projectId: 'prj-02',
    date: '2026-11-12',
    category: 'Nhân công/Công tác phí',
    amount: 75000000,
    requesterId: 'emp-2',
    status: 'Đã duyệt',
    note: 'Phụ cấp thi công ca đêm ngoài giờ hành chính tại tòa nhà Q.1',
  },

  // Chi phí Dự án 3
  {
    id: 'exp-301',
    projectId: 'prj-03',
    date: '2026-09-10',
    category: 'Vật tư/Thiết bị',
    amount: 365000000,
    requesterId: 'emp-5',
    status: 'Đã duyệt',
    note: 'Switch Cisco Catalyst, Tủ Rack 42U & Bộ lưu điện UPS 10kVA',
  },
  {
    id: 'exp-302',
    projectId: 'prj-03',
    date: '2026-10-28',
    category: 'Nhân công/Công tác phí',
    amount: 58000000,
    requesterId: 'emp-1',
    status: 'Đã duyệt',
    note: 'Chi phí triển khai, bấm đầu cáp & đo kiểm Fluke toàn hệ thống',
  },
];

// ============================================================================
// COMPONENT CHÍNH (APP)
// ============================================================================

export default function App() {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | contracts | projects | finance | team

  // Persistent Data States
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('tc_team_v1');
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });

  const [contracts, setContracts] = useState(() => {
    const saved = localStorage.getItem('tc_contracts_v1');
    return saved ? JSON.parse(saved) : INITIAL_CONTRACTS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('tc_projects_v1');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tc_tasks_v1');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('tc_expenses_v1');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  // UI Selection & Filter States
  const [selectedProjectId, setSelectedProjectId] = useState('prj-01');
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tc_team_v1', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('tc_contracts_v1', JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem('tc_projects_v1', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tc_tasks_v1', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tc_expenses_v1', JSON.stringify(expenses));
  }, [expenses]);

  // Toast Notification Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Reset Demo Data
  const handleResetDemoData = () => {
    setTeam(INITIAL_TEAM);
    setContracts(INITIAL_CONTRACTS);
    setProjects(INITIAL_PROJECTS);
    setTasks(INITIAL_TASKS);
    setExpenses(INITIAL_EXPENSES);
    setSelectedProjectId('prj-01');
    showToast('Đã khôi phục toàn bộ dữ liệu mẫu chuẩn!', 'info');
  };

  // ============================================================================
  // TÍNH TOÁN CHỈ SỐ TỔNG HỢP (DERIVED ANALYTICS)
  // ============================================================================

  const projectMetrics = useMemo(() => {
    return projects.map((prj) => {
      const prjTasks = tasks.filter((t) => t.projectId === prj.id);
      const prjExpenses = expenses.filter((e) => e.projectId === prj.id);

      const totalActualCost = prjExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
      const approvedCost = prjExpenses
        .filter((e) => e.status === 'Đã duyệt')
        .reduce((sum, e) => sum + Number(e.amount || 0), 0);
      const pendingCost = prjExpenses
        .filter((e) => e.status === 'Chờ duyệt')
        .reduce((sum, e) => sum + Number(e.amount || 0), 0);

      const avgProgress =
        prjTasks.length > 0
          ? Math.round(prjTasks.reduce((sum, t) => sum + Number(t.progress || 0), 0) / prjTasks.length)
          : 0;

      const overdueTasks = prjTasks.filter(
        (t) => t.status !== 'Hoàn thành' && getDaysDiff(t.deadline, TODAY_STR) < 0
      );

      const profit = prj.contractValue - totalActualCost;
      const profitMargin = prj.contractValue > 0 ? (profit / prj.contractValue) * 100 : 0;
      const budgetUsagePercent =
        prj.plannedBudget > 0 ? Math.round((totalActualCost / prj.plannedBudget) * 100) : 0;
      const isOverBudget = totalActualCost > prj.plannedBudget;

      return {
        ...prj,
        tasks: prjTasks,
        expenses: prjExpenses,
        totalActualCost,
        approvedCost,
        pendingCost,
        avgProgress,
        overdueTasksCount: overdueTasks.length,
        profit,
        profitMargin,
        budgetUsagePercent,
        isOverBudget,
      };
    });
  }, [projects, tasks, expenses]);

  const dashboardSummary = useMemo(() => {
    const activeProjects = projectMetrics.filter((p) => p.status === 'Đang thi công');
    const totalRunningContractValue = activeProjects.reduce((sum, p) => sum + p.contractValue, 0);
    const totalAllContractValue = projectMetrics.reduce((sum, p) => sum + p.contractValue, 0);
    const totalActualCostAll = projectMetrics.reduce((sum, p) => sum + p.totalActualCost, 0);
    const totalEstimatedProfit = totalAllContractValue - totalActualCostAll;
    const avgProfitMargin =
      totalAllContractValue > 0 ? (totalEstimatedProfit / totalAllContractValue) * 100 : 0;

    const overdueProjectsCount = projectMetrics.filter(
      (p) => p.status !== 'Hoàn thành' && (p.overdueTasksCount > 0 || getDaysDiff(p.endDate, TODAY_STR) < 0)
    ).length;

    // Đầu việc sắp đến hạn trong 7 ngày tới hoặc đã trễ hạn
    const urgentTasks = tasks
      .filter((t) => t.status !== 'Hoàn thành')
      .map((t) => {
        const diff = getDaysDiff(t.deadline, TODAY_STR);
        const prj = projects.find((p) => p.id === t.projectId);
        const emp = team.find((m) => m.id === t.assigneeId);
        return { ...t, daysLeft: diff, projectName: prj?.name || '---', projectCode: prj?.code || '', assignee: emp };
      })
      .filter((t) => t.daysLeft <= 7)
      .sort((a, b) => a.daysLeft - b.daysLeft);

    const overBudgetProjects = projectMetrics.filter((p) => p.isOverBudget || p.budgetUsagePercent >= 90);

    return {
      activeCount: activeProjects.length,
      totalProjectsCount: projects.length,
      totalRunningContractValue,
      totalAllContractValue,
      totalActualCostAll,
      totalEstimatedProfit,
      avgProfitMargin,
      overdueProjectsCount,
      urgentTasks,
      overBudgetProjects,
    };
  }, [projectMetrics, tasks, projects, team]);

  // Xuất báo cáo CSV cho 1 dự án
  const handleExportProjectCSV = (projectId) => {
    const prj = projectMetrics.find((p) => p.id === projectId);
    if (!prj) return;

    const lines = [];
    lines.push(['BAO CAO TONG HOP DU AN', prj.code, prj.name].join(','));
    lines.push(['Khach hang', `"${prj.client}"`].join(','));
    lines.push(['Gia tri Hop dong (VND)', prj.contractValue].join(','));
    lines.push(['Ngan sach Du toan (VND)', prj.plannedBudget].join(','));
    lines.push(['Chi phi Thuc te (VND)', prj.totalActualCost].join(','));
    lines.push(['Loi nhuan Du kien (VND)', prj.profit, `Bien loi nhuan: ${prj.profitMargin.toFixed(1)}%`].join(','));
    lines.push([]);
    lines.push(['--- KE HOACH THI CONG & TIEN DO ---']);
    lines.push(['Giai doan', 'Hang muc cong viec', 'Nguoi phu trach', 'Bat dau', 'Han chot', 'Tien do (%)', 'Trang thai'].join(','));

    prj.tasks.forEach((t) => {
      const emp = team.find((m) => m.id === t.assigneeId);
      lines.push(
        [
          `"${t.phase}"`,
          `"${t.name}"`,
          `"${emp ? emp.name : ''}"`,
          t.startDate,
          t.deadline,
          t.progress,
          `"${t.status}"`,
        ].join(',')
      );
    });

    lines.push([]);
    lines.push(['--- NHAT KY CHI PHI DU AN ---']);
    lines.push(['Ngay chi', 'Hang muc chi', 'So tien (VND)', 'Nguoi de xuat', 'Trang thai', 'Ghi chu'].join(','));

    prj.expenses.forEach((e) => {
      const emp = team.find((m) => m.id === e.requesterId);
      lines.push(
        [
          e.date,
          `"${e.category}"`,
          e.amount,
          `"${emp ? emp.name : ''}"`,
          `"${e.status}"`,
          `"${e.note}"`,
        ].join(',')
      );
    });

    const csvContent = '\uFEFF' + lines.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BaoCao_${prj.code}_${TODAY_STR}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Đã xuất file CSV báo cáo dự án ${prj.code}!`);
  };

  // ============================================================================
  // NAVIGATION ITEMS
  // ============================================================================
  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard, badge: dashboardSummary.urgentTasks.length },
    { id: 'contracts', label: 'Hợp đồng', icon: FileText, badge: contracts.filter((c) => !c.convertedProjectId).length },
    { id: 'projects', label: 'Dự án & Thi công', icon: FolderKanban, badge: dashboardSummary.activeCount },
    { id: 'finance', label: 'Chi phí & Lợi nhuận', icon: Wallet, badge: expenses.filter((e) => e.status === 'Chờ duyệt').length },
    { id: 'team', label: 'Đội ngũ 6 Nhân sự', icon: Users, badge: null },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row font-sans">
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border bg-slate-900 text-white border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 border-r border-slate-800">
        {/* Brand Logo */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight text-base leading-tight">TechConstruct</h1>
            <p className="text-xs text-slate-400">Quản trị Dự án Kỹ thuật</p>
          </div>
        </div>

        {/* Date Context Banner */}
        <div className="mx-4 mt-4 px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-400" /> Hôm nay:
          </span>
          <span className="font-semibold text-slate-200">{formatDateVN(TODAY_STR)}</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-x-auto md:overflow-visible flex md:flex-col">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </span>
                {item.badge > 0 && (
                  <span
                    className={`ml-2 px-2 py-0.5 text-xs rounded-full font-semibold ${
                      isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Team Summary & Reset */}
        <div className="p-4 border-t border-slate-800 space-y-3 hidden md:block">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Quy mô đội ngũ</span>
              <span className="text-xs font-bold text-emerald-400">{team.length} Nhân sự</span>
            </div>
            <div className="flex -space-x-2">
              {team.map((member) => (
                <div
                  key={member.id}
                  title={`${member.name} - ${member.role}`}
                  className={`w-7 h-7 rounded-full ${member.color} text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-slate-900`}
                >
                  {member.avatar}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleResetDemoData}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/70 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Khôi phục dữ liệu mẫu
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hệ thống điều hành Hợp đồng • Thi công • Tài chính • Nhân sự tinh gọn
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetDemoData}
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Mẫu
            </button>
            <button
              onClick={() => handleExportProjectCSV(selectedProjectId)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Xuất CSV Dự án đang chọn
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="p-6 max-w-[1440px] w-full mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              summary={dashboardSummary}
              projectMetrics={projectMetrics}
              onSelectProject={(id) => {
                setSelectedProjectId(id);
                setActiveTab('projects');
              }}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'contracts' && (
            <ContractsView
              contracts={contracts}
              setContracts={setContracts}
              projects={projects}
              setProjects={setProjects}
              setTasks={setTasks}
              setExpenses={setExpenses}
              team={team}
              showToast={showToast}
              onOpenProject={(prjId) => {
                setSelectedProjectId(prjId);
                setActiveTab('projects');
              }}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsScheduleView
              projects={projectMetrics}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
              tasks={tasks}
              setTasks={setTasks}
              team={team}
              showToast={showToast}
              onExportCSV={handleExportProjectCSV}
            />
          )}

          {activeTab === 'finance' && (
            <FinanceBudgetView
              projects={projectMetrics}
              setProjects={setProjects}
              expenses={expenses}
              setExpenses={setExpenses}
              team={team}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
              showToast={showToast}
            />
          )}

          {activeTab === 'team' && (
            <TeamWorkloadView
              team={team}
              setTeam={setTeam}
              tasks={tasks}
              projects={projects}
              showToast={showToast}
              onJumpToTask={(prjId) => {
                setSelectedProjectId(prjId);
                setActiveTab('projects');
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// 1. PHÂN HỆ TỔNG QUAN (DASHBOARD VIEW)
// ============================================================================

function DashboardView({ summary, projectMetrics, onSelectProject, onNavigate }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Hợp đồng đang chạy
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatCompactVND(summary.totalRunningContractValue)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tổng danh mục: <span className="font-semibold text-slate-700">{formatCompactVND(summary.totalAllContractValue)}</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tổng chi phí thực tế
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatCompactVND(summary.totalActualCostAll)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Đã ghi nhận trên {summary.totalProjectsCount} dự án triển khai
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Lợi nhuận gộp dự kiến
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">
              {formatCompactVND(summary.totalEstimatedProfit)}
            </span>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
              {summary.avgProfitMargin.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Tỷ suất biên lợi nhuận trung bình toàn công ty</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Dự án thi công / Quá hạn
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{summary.activeCount}</span>
            <span className="text-sm text-slate-500">đang chạy</span>
            {summary.overdueProjectsCount > 0 && (
              <span className="ml-auto px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-700">
                {summary.overdueProjectsCount} có hạng mục trễ
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">Tổng cộng {summary.totalProjectsCount} dự án trong hệ thống</p>
        </div>
      </div>

      {/* Main Grid: Project Progress & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Project Progress Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">Tiến độ & Sức khỏe Tài chính Dự án</h3>
              <p className="text-xs text-slate-500">Nhấp vào từng dự án để mở bảng kế hoạch thi công chi tiết</p>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Xem kế hoạch chi tiết <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {projectMetrics.map((prj) => (
              <div
                key={prj.id}
                onClick={() => onSelectProject(prj.id)}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-800 text-white">
                        {prj.code}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          prj.status === 'Hoàn thành'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {prj.status}
                      </span>
                      {prj.isOverBudget && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Vượt dự toán
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 mt-1.5 group-hover:text-blue-700 transition-colors">
                      {prj.name}
                    </h4>
                    <p className="text-xs text-slate-500">{prj.client} • Hạn bàn giao: {formatDateVN(prj.endDate)}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-500">Giá trị HĐ / Lợi nhuận</div>
                    <div className="text-sm font-bold text-slate-900">{formatCompactVND(prj.contractValue)}</div>
                    <div
                      className={`text-xs font-semibold ${
                        prj.profit >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      Lãi: {formatCompactVND(prj.profit)} ({prj.profitMargin.toFixed(1)}%)
                    </div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">Tiến độ thi công</span>
                      <span className="font-bold text-blue-700">{prj.avgProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${prj.avgProgress}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">Giải ngân / Dự toán ({formatCompactVND(prj.plannedBudget)})</span>
                      <span
                        className={`font-bold ${
                          prj.isOverBudget ? 'text-rose-600' : 'text-slate-800'
                        }`}
                      >
                        {prj.budgetUsagePercent}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          prj.isOverBudget
                            ? 'bg-rose-500'
                            : prj.budgetUsagePercent > 85
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(prj.budgetUsagePercent, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Alerts (Deadlines within 7 days & Budget warnings) */}
        <div className="space-y-6">
          {/* Deadline Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cảnh báo Hạn chót (≤ 7 ngày)</h3>
                <p className="text-xs text-slate-500">Các đầu việc cần ưu tiên đốc thúc</p>
              </div>
            </div>

            {summary.urgentTasks.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-medium text-center">
                Tuyệt vời! Không có đầu việc nào sắp trễ hạn trong 7 ngày tới.
              </div>
            ) : (
              <div className="space-y-3">
                {summary.urgentTasks.map((task) => {
                  const isOverdue = task.daysLeft < 0;
                  return (
                    <div
                      key={task.id}
                      onClick={() => onSelectProject(task.projectId)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isOverdue
                          ? 'bg-rose-50/70 border-rose-200 hover:bg-rose-50'
                          : 'bg-amber-50/60 border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          {task.projectCode}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            isOverdue ? 'text-rose-700' : 'text-amber-700'
                          }`}
                        >
                          {isOverdue
                            ? `Trễ ${Math.abs(task.daysLeft)} ngày`
                            : task.daysLeft === 0
                            ? 'Hết hạn hôm nay'
                            : `Còn ${task.daysLeft} ngày`}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 line-clamp-2">{task.name}</p>
                      <div className="flex items-center justify-between mt-2 text-[11px] text-slate-600">
                        <span>Phụ trách: <strong>{task.assignee?.name}</strong></span>
                        <span>Tiến độ: <strong>{task.progress}%</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Budget Warnings */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cảnh báo Ngân sách Dự toán</h3>
                <p className="text-xs text-slate-500">Dự án chạm ngưỡng ≥ 90% hoặc vượt dự toán</p>
              </div>
            </div>

            {summary.overBudgetProjects.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-slate-600 text-xs text-center">
                Tất cả dự án đều đang kiểm soát tốt chi phí trong hạn mức dự toán.
              </div>
            ) : (
              <div className="space-y-3">
                {summary.overBudgetProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onNavigate('finance')}
                    className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 cursor-pointer hover:bg-rose-50"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-900">{p.code}</span>
                      <span className="text-xs font-bold text-rose-700">
                        Đã chi {p.budgetUsagePercent}% dự toán
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 truncate mb-1.5">{p.name}</p>
                    <div className="text-[11px] text-slate-600 flex justify-between">
                      <span>Dự toán: {formatCompactVND(p.plannedBudget)}</span>
                      <span className="font-bold text-rose-700">Thực chi: {formatCompactVND(p.totalActualCost)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. PHÂN HỆ QUẢN LÝ HỢP ĐỒNG (CONTRACTS VIEW)
// ============================================================================

function ContractsView({
  contracts,
  setContracts,
  projects,
  setProjects,
  setTasks,
  setExpenses,
  team,
  showToast,
  onOpenProject,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    client: '',
    value: '',
    signedDate: TODAY_STR,
    status: 'Mới ký',
    paymentStage: 'Tạm ứng (30%)',
    paidAmount: '',
    notes: '',
  });

  const openAddModal = () => {
    setEditingContract(null);
    setFormData({
      code: `HĐ-2026/0${contracts.length + 26}-TECH`,
      name: '',
      client: '',
      value: 500000000,
      signedDate: TODAY_STR,
      status: 'Mới ký',
      paymentStage: 'Tạm ứng (30%)',
      paidAmount: 150000000,
      notes: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (contract) => {
    setEditingContract(contract);
    setFormData({
      code: contract.code,
      name: contract.name,
      client: contract.client,
      value: contract.value,
      signedDate: contract.signedDate,
      status: contract.status,
      paymentStage: contract.paymentStage,
      paidAmount: contract.paidAmount,
      notes: contract.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveContract = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      value: Number(formData.value) || 0,
      paidAmount: Number(formData.paidAmount) || 0,
    };

    if (editingContract) {
      setContracts((prev) =>
        prev.map((c) => (c.id === editingContract.id ? { ...c, ...payload } : c))
      );
      showToast('Đã cập nhật thông tin hợp đồng!');
    } else {
      const newContract = {
        id: `hd-${Date.now()}`,
        ...payload,
        convertedProjectId: null,
      };
      setContracts((prev) => [newContract, ...prev]);
      showToast('Đã thêm hợp đồng mới thành công!');
    }
    setIsModalOpen(false);
  };

  const handleDeleteContract = (id) => {
    setContracts((prev) => prev.filter((c) => c.id !== id));
    showToast('Đã xóa hợp đồng khỏi danh sách.');
  };

  // TÍNH NĂNG ĐẶC BIỆT: CHUYỂN ĐỔI HỢP ĐỒNG THÀNH DỰ ÁN
  const handleConvertToProject = (contract) => {
    if (contract.convertedProjectId) {
      onOpenProject(contract.convertedProjectId);
      return;
    }

    const newProjectId = `prj-${Date.now()}`;
    const prjCode = `DA-0${projects.length + 1}-${contract.code.split('-').pop()}`;
    // Mặc định dự toán chi phí = 72% giá trị hợp đồng (mục tiêu lợi nhuận 28%)
    const estimatedBudget = Math.round(contract.value * 0.72);

    // Tính ngày kết thúc mặc định +45 ngày
    const startObj = new Date(TODAY_STR);
    const endObj = new Date(startObj);
    endObj.setDate(endObj.getDate() + 45);
    const endDateStr = endObj.toISOString().split('T')[0];

    const newProject = {
      id: newProjectId,
      contractId: contract.id,
      code: prjCode,
      name: contract.name,
      client: contract.client,
      contractValue: contract.value,
      plannedBudget: estimatedBudget,
      startDate: TODAY_STR,
      endDate: endDateStr,
      managerId: team[0]?.id || 'emp-1',
      status: 'Đang thi công',
    };

    // Khởi tạo sẵn 4 đầu việc khung tiêu chuẩn cho công ty thi công
    const d1 = new Date(startObj);
    d1.setDate(d1.getDate() + 7);
    const d2 = new Date(startObj);
    d2.setDate(d2.getDate() + 20);
    const d3 = new Date(startObj);
    d3.setDate(d3.getDate() + 38);

    const starterTasks = [
      {
        id: `tsk-${Date.now()}-1`,
        projectId: newProjectId,
        phase: '1. Khảo sát & Thiết kế',
        name: 'Khảo sát hiện trường & Lập bản vẽ thi công chi tiết',
        assigneeId: team[1]?.id || 'emp-2',
        startDate: TODAY_STR,
        deadline: d1.toISOString().split('T')[0],
        progress: 0,
        status: 'Đang làm',
      },
      {
        id: `tsk-${Date.now()}-2`,
        projectId: newProjectId,
        phase: '2. Mua sắm vật tư/thiết bị',
        name: 'Đặt hàng thiết bị chính & Tập kết vật tư phụ',
        assigneeId: team[4]?.id || 'emp-5',
        startDate: d1.toISOString().split('T')[0],
        deadline: d2.toISOString().split('T')[0],
        progress: 0,
        status: 'Chưa làm',
      },
      {
        id: `tsk-${Date.now()}-3`,
        projectId: newProjectId,
        phase: '3. Thi công lắp đặt',
        name: 'Triển khai lắp đặt hệ thống tại công trình',
        assigneeId: team[2]?.id || 'emp-3',
        startDate: d2.toISOString().split('T')[0],
        deadline: d3.toISOString().split('T')[0],
        progress: 0,
        status: 'Chưa làm',
      },
      {
        id: `tsk-${Date.now()}-4`,
        projectId: newProjectId,
        phase: '4. Chạy thử & Bàn giao',
        name: 'Chạy thử liên động, Nghiệm thu & Bàn giao đưa vào sử dụng',
        assigneeId: team[0]?.id || 'emp-1',
        startDate: d3.toISOString().split('T')[0],
        deadline: endDateStr,
        progress: 0,
        status: 'Chưa làm',
      },
    ];

    setProjects((prev) => [newProject, ...prev]);
    setTasks((prev) => [...prev, ...starterTasks]);
    setContracts((prev) =>
      prev.map((c) =>
        c.id === contract.id
          ? { ...c, status: 'Đang triển khai', convertedProjectId: newProjectId }
          : c
      )
    );

    showToast(`Đã khởi tạo Dự án ${prjCode} kèm 4 giai đoạn thi công mẫu!`);
    onOpenProject(newProjectId);
  };

  const filteredContracts = contracts.filter((c) => {
    const matchSearch =
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Mới ký':
        return 'bg-blue-100 text-blue-700';
      case 'Đang triển khai':
        return 'bg-amber-100 text-amber-800';
      case 'Nghiệm thu':
        return 'bg-purple-100 text-purple-700';
      case 'Thanh lý':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm mã HĐ, tên gói thầu, khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Tất cả trạng thái HĐ</option>
            <option value="Mới ký">Mới ký</option>
            <option value="Đang triển khai">Đang triển khai</option>
            <option value="Nghiệm thu">Nghiệm thu</option>
            <option value="Thanh lý">Thanh lý</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 text-white hover:opacity-95 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Tải lên & Phân tích Hợp đồng AI
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm thủ công
          </button>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                <th className="py-3.5 px-4">Mã HĐ & Ngày ký</th>
                <th className="py-3.5 px-4">Nội dung Hợp đồng & Khách hàng</th>
                <th className="py-3.5 px-4 text-right">Giá trị HĐ (VNĐ)</th>
                <th className="py-3.5 px-4">Tiến độ Thanh toán</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Triển khai & Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredContracts.map((contract) => {
                const paidPct =
                  contract.value > 0 ? Math.round((contract.paidAmount / contract.value) * 100) : 0;
                return (
                  <tr key={contract.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <div className="font-bold text-slate-900">{contract.code}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Ký: {formatDateVN(contract.signedDate)}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top max-w-xs">
                      <div className="font-bold text-slate-900 leading-snug">{contract.name}</div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">{contract.client}</div>
                      {contract.notes && (
                        <div className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
                          {contract.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                      <div className="font-bold text-slate-900">{formatVND(contract.value)}</div>
                      <div className="text-xs text-emerald-600 font-medium mt-0.5">
                        Đã thu: {formatCompactVND(contract.paidAmount)} ({paidPct}%)
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                        {contract.paymentStage}
                      </span>
                      <div className="w-28 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(paidPct, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                          contract.status
                        )}`}
                      >
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {contract.convertedProjectId ? (
                          <button
                            onClick={() => onOpenProject(contract.convertedProjectId)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                          >
                            <FolderKanban className="w-3.5 h-3.5" />
                            Mở Dự án
                          </button>
                        ) : (
                          <button
                            onClick={() => handleConvertToProject(contract)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
                            title="Khởi tạo dự án thi công kế thừa thông tin từ hợp đồng này"
                          >
                            <ArrowRightCircle className="w-3.5 h-3.5" />
                            Chuyển thành Dự án
                          </button>
                        )}

                        <button
                          onClick={() => openEditModal(contract)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                          title="Sửa hợp đồng"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContract(contract.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Xóa hợp đồng"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit Contract */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingContract ? 'Cập nhật Hợp đồng' : 'Thêm Hợp đồng mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContract} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mã Hợp đồng *</label>
                  <input
                    required
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày ký *</label>
                  <input
                    required
                    type="date"
                    value={formData.signedDate}
                    onChange={(e) => setFormData({ ...formData, signedDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên gói thầu / Nội dung hợp đồng *
                </label>
                <input
                  required
                  type="text"
                  placeholder="VD: Thi công hệ thống điện nhẹ tòa nhà..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Khách hàng / Chủ đầu tư *</label>
                <input
                  required
                  type="text"
                  placeholder="VD: Công ty TNHH..."
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Giá trị Hợp đồng (VNĐ) *</label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="1000000"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Số tiền đã thu (VNĐ)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000000"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Trạng thái Hợp đồng</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Mới ký">Mới ký</option>
                    <option value="Đang triển khai">Đang triển khai</option>
                    <option value="Nghiệm thu">Nghiệm thu</option>
                    <option value="Thanh lý">Thanh lý</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tiến độ Thanh toán</label>
                  <select
                    value={formData.paymentStage}
                    onChange={(e) => setFormData({ ...formData, paymentStage: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Chưa tạm ứng">Chưa tạm ứng</option>
                    <option value="Tạm ứng (30%)">Tạm ứng (30%)</option>
                    <option value="Tạm ứng (40%)">Tạm ứng (40%)</option>
                    <option value="Đợt 1 (70%)">Đợt 1 (70%)</option>
                    <option value="Quyết toán (100%)">Quyết toán (100%)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ghi chú điều khoản</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editingContract ? 'Lưu thay đổi' : 'Tạo Hợp đồng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Contract Upload & Auto-Extraction Modal */}
      {isAIModalOpen && (
        <AIContractAnalyzerModal
          onClose={() => setIsAIModalOpen(false)}
          team={team}
          contractsCount={contracts.length}
          projectsCount={projects.length}
          onConfirmDeploy={(extractedPayload) => {
            const { contractData, projectData, tasksList, budgetPlanList } = extractedPayload;

            const newContractId = `hd-${Date.now()}`;
            const newProjectId = `prj-${Date.now() + 1}`;

            // 1. Tạo hợp đồng mới
            const newContract = {
              id: newContractId,
              code: contractData.code,
              name: contractData.name,
              client: contractData.client,
              value: Number(contractData.value) || 0,
              signedDate: contractData.signedDate || TODAY_STR,
              status: 'Đang triển khai',
              paymentStage: contractData.paymentStage || 'Tạm ứng (30%)',
              paidAmount: Number(contractData.paidAmount) || 0,
              convertedProjectId: newProjectId,
              notes: contractData.notes || 'Khởi tạo tự động từ AI phân tích hợp đồng.',
            };

            // 2. Tính tổng ngân sách dự toán từ bảng phân bổ chi phí AI
            const totalPlannedBudget = budgetPlanList.reduce(
              (sum, item) => sum + (Number(item.amount) || 0),
              0
            );

            // 3. Tạo dự án liên kết
            const newProject = {
              id: newProjectId,
              contractId: newContractId,
              code: projectData.code,
              name: projectData.name,
              client: contractData.client,
              contractValue: Number(contractData.value) || 0,
              plannedBudget: totalPlannedBudget > 0 ? totalPlannedBudget : Math.round(Number(contractData.value) * 0.72),
              startDate: projectData.startDate || TODAY_STR,
              endDate: projectData.endDate || TODAY_STR,
              managerId: projectData.managerId || team[0]?.id || 'emp-1',
              status: 'Đang thi công',
            };

            // 4. Tạo danh sách hạng mục thi công WBS & Timeline
            const newTasks = tasksList.map((t, idx) => ({
              id: `tsk-${Date.now()}-${idx}`,
              projectId: newProjectId,
              phase: t.phase || '3. Thi công lắp đặt',
              name: t.name,
              assigneeId: t.assigneeId || team[idx % team.length]?.id || 'emp-1',
              startDate: t.startDate || projectData.startDate || TODAY_STR,
              deadline: t.deadline || projectData.endDate || TODAY_STR,
              progress: 0,
              status: idx === 0 ? 'Đang làm' : 'Chưa làm',
            }));

            // 5. Ghi nhận các khoản dự toán khởi tạo vào sổ chi phí ở trạng thái "Chờ duyệt" để kế toán theo dõi giải ngân
            const initialPlannedExpenses = budgetPlanList
              .filter((b) => Number(b.amount) > 0)
              .map((b, idx) => ({
                id: `exp-${Date.now()}-${idx}`,
                projectId: newProjectId,
                date: TODAY_STR,
                category: b.category,
                amount: Number(b.amount),
                requesterId: team[4]?.id || 'emp-5',
                status: 'Chờ duyệt',
                note: `[Dự toán AI] ${b.note || b.category}`,
              }));

            setContracts((prev) => [newContract, ...prev]);
            setProjects((prev) => [newProject, ...prev]);
            setTasks((prev) => [...prev, ...newTasks]);
            if (initialPlannedExpenses.length > 0) {
              setExpenses((prev) => [...initialPlannedExpenses, ...prev]);
            }

            setIsAIModalOpen(false);
            showToast(
              `Đã đồng bộ AI thành công: Hợp đồng ${newContract.code} → Dự án ${newProject.code} (${newTasks.length} hạng mục)!`
            );
            onOpenProject(newProjectId);
          }}
        />
      )}
    </div>
  );
}

// ============================================================================
// MODAL UPLOAD & PHÂN TÍCH HỢP ĐỒNG BẰNG GEMINI AI (AI CONTRACT ANALYZER)
// ============================================================================

function AIContractAnalyzerModal({
  onClose,
  team,
  contractsCount,
  projectsCount,
  onConfirmDeploy,
}) {
  const [step, setStep] = useState('upload'); // upload | analyzing | review
  const [analysisStageText, setAnalysisStageText] = useState('');
  const [rawText, setRawText] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null); // { name, mimeType, base64Data, isText }
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Review State (4 khối dữ liệu sau khi AI trích xuất)
  const [reviewTab, setReviewTab] = useState('contract'); // contract | project | tasks | budget
  const [extractedState, setExtractedState] = useState(null);

  // Xử lý chọn file từ máy tính
  const handleFileSelect = (file) => {
    if (!file) return;
    setErrorMsg('');

    const fileName = file.name;
    const ext = fileName.split('.').pop().toLowerCase();

    // Nếu là file văn bản thuần (.txt, .md, .csv, .json) -> Đọc text
    if (['txt', 'md', 'csv', 'json', 'xml', 'html'].includes(ext)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target.result;
        setRawText(text);
        setUploadedFile({ name: fileName, mimeType: 'text/plain', base64Data: null, isText: true });
      };
      reader.readAsText(file);
      return;
    }

    // Nếu là PDF hoặc hình ảnh scan hợp đồng (.pdf, .png, .jpg, .jpeg, .webp) -> Đọc base64 gửi inlineData cho Gemini
    if (['pdf', 'png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
      const mimeMap = {
        pdf: 'application/pdf',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        webp: 'image/webp',
      };
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        const base64Data = dataUrl.split(',')[1];
        setUploadedFile({
          name: fileName,
          mimeType: mimeMap[ext] || file.type || 'application/pdf',
          base64Data,
          isText: false,
        });
      };
      reader.readAsDataURL(file);
      return;
    }

    // Fallback cho file .doc/.docx hoặc định dạng khác: đọc text thô hoặc thông báo hỗ trợ dán nội dung
    const fallbackReader = new FileReader();
    fallbackReader.onload = (ev) => {
      const content = String(ev.target.result || '');
      // Lọc ký tự đọc được nếu là binary
      const readable = content.replace(/[^\x20-\x7E\u00A0-\uFFFF\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
      setUploadedFile({ name: fileName, mimeType: 'text/plain', base64Data: null, isText: true });
      if (readable.length > 40) {
        setRawText(readable.slice(0, 12000));
      } else {
        setErrorMsg(
          `File "${fileName}" là định dạng nhị phân đóng gói. Bạn có thể copy nội dung hợp đồng dán vào ô bên dưới hoặc chuyển sang PDF/TXT để AI đọc chính xác nhất.`
        );
      }
    };
    fallbackReader.readAsText(file);
  };

  // Nạp nhanh hợp đồng mẫu
  const handleLoadSample = (sample) => {
    setErrorMsg('');
    setUploadedFile({
      name: `${sample.title}.txt`,
      mimeType: 'text/plain',
      base64Data: null,
      isText: true,
    });
    setRawText(sample.content);
  };

  // Gọi Gemini API để phân tích cấu trúc hợp đồng
  const runGeminiAnalysis = async () => {
    if (!rawText.trim() && !uploadedFile?.base64Data) {
      setErrorMsg('Vui lòng tải lên file hợp đồng, chọn mẫu có sẵn hoặc dán nội dung văn bản hợp đồng!');
      return;
    }

    setErrorMsg('');
    setStep('analyzing');

    const stages = [
      '1/4 Đang đọc tài liệu & nhận diện thông tin pháp lý hợp đồng...',
      '2/4 Đang bóc tách giá trị gói thầu & điều khoản thanh toán...',
      '3/4 Đang lập bảng tiến độ thi công (WBS) & phân công 6 nhân sự...',
      '4/4 Đang tính toán định mức dự toán chi phí & biên lợi nhuận...',
    ];

    let stageIdx = 0;
    setAnalysisStageText(stages[0]);
    const stageTimer = setInterval(() => {
      stageIdx = (stageIdx + 1) % stages.length;
      setAnalysisStageText(stages[stageIdx]);
    }, 1100);

    try {
      const teamContext = team
        .map((m) => `- ID: "${m.id}" | Tên: ${m.name} | Chức vụ: ${m.role}`)
        .join('\n');

      const systemPrompt = `Bạn là Trợ lý AI Chuyên gia Quản trị Dự án & Đấu thầu Kỹ thuật của công ty TechConstruct (quy mô 6 nhân sự).
Nhiệm vụ của bạn là đọc tài liệu hợp đồng được cung cấp và trích xuất toàn bộ dữ liệu có cấu trúc để tự động khởi tạo Dự án, Kế hoạch thi công (WBS/Timeline) và Dự toán Chi phí.

Danh sách 6 nhân sự hiện có của công ty để bạn tự động phân công phù hợp:
${teamContext}

Hôm nay là ngày ${TODAY_STR}.
Quy tắc trích xuất:
1. Nếu hợp đồng thiếu mã số, tự tạo mã dạng "HĐ-2026/0${contractsCount + 35}-AI".
2. Giá trị tiền tệ phải quy đổi ra số nguyên VNĐ (ví dụ 1.5 tỷ -> 1500000000).
3. Tự động chia phạm vi công việc thành 4 đến 6 hạng mục thi công cụ thể theo trình tự (1. Khảo sát & Thiết kế, 2. Mua sắm vật tư/thiết bị, 3. Thi công lắp đặt, 4. Chạy thử & Bàn giao) với ngày bắt đầu và hạn chót (YYYY-MM-DD) hợp lý, gán đúng assigneeId từ danh sách 6 nhân sự trên.
4. Lập dự toán chi phí theo các nhóm chuẩn ("Vật tư/Thiết bị", "Nhân công/Công tác phí", "Vận chuyển", "Thuê ngoài", "Chi phí khác") sao cho tổng dự toán khoảng 68% - 75% giá trị hợp đồng (hoặc đúng theo số liệu trong hợp đồng nếu có).`;

      const userParts = [
        {
          text: `Hãy phân tích hợp đồng sau và trả về JSON chuẩn theo schema quy định.\n${
            rawText ? `Nội dung văn bản hợp đồng:\n${rawText}` : 'Vui lòng phân tích file đính kèm.'
          }`,
        },
      ];

      if (uploadedFile && !uploadedFile.isText && uploadedFile.base64Data) {
        userParts.push({
          inlineData: {
            mimeType: uploadedFile.mimeType,
            data: uploadedFile.base64Data,
          },
        });
      }

      const payload = {
        contents: [{ role: 'user', parts: userParts }],
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              contract: {
                type: 'OBJECT',
                properties: {
                  code: { type: 'STRING' },
                  name: { type: 'STRING' },
                  client: { type: 'STRING' },
                  value: { type: 'NUMBER' },
                  signedDate: { type: 'STRING' },
                  paymentStage: { type: 'STRING' },
                  paidAmount: { type: 'NUMBER' },
                  notes: { type: 'STRING' },
                },
                required: ['code', 'name', 'client', 'value', 'signedDate', 'paymentStage', 'paidAmount'],
              },
              project: {
                type: 'OBJECT',
                properties: {
                  code: { type: 'STRING' },
                  name: { type: 'STRING' },
                  startDate: { type: 'STRING' },
                  endDate: { type: 'STRING' },
                  managerId: { type: 'STRING' },
                  location: { type: 'STRING' },
                  priority: { type: 'STRING' },
                },
                required: ['code', 'name', 'startDate', 'endDate', 'managerId'],
              },
              tasks: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    phase: { type: 'STRING' },
                    name: { type: 'STRING' },
                    assigneeId: { type: 'STRING' },
                    startDate: { type: 'STRING' },
                    deadline: { type: 'STRING' },
                  },
                  required: ['phase', 'name', 'assigneeId', 'startDate', 'deadline'],
                },
              },
              budgetPlan: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    category: { type: 'STRING' },
                    amount: { type: 'NUMBER' },
                    note: { type: 'STRING' },
                  },
                  required: ['category', 'amount', 'note'],
                },
              },
            },
            required: ['contract', 'project', 'tasks', 'budgetPlan'],
          },
        },
      };

      
  
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
   
        
      // Exponential backoff retry
      let response = null;
      let delay = 10000;
      for (let attempt = 0; attempt < 3; attempt++) {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) break;
        await new Promise((r) => setTimeout(r, delay));
        delay *= 2;
      }

      if (!response || !response.ok) {
        throw new Error('Không thể kết nối tới dịch vụ AI phân tích lúc này.');
      }

      const result = await response.json();
      const jsonStr = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!jsonStr) {
        throw new Error('AI không trả về dữ liệu hợp lệ.');
      }

      const parsed = JSON.parse(jsonStr);

      // Chuẩn hóa assigneeId & managerId đảm bảo luôn khớp với 6 nhân sự hiện có
      const validIds = new Set(team.map((m) => m.id));
      const safeManagerId = validIds.has(parsed.project?.managerId) ? parsed.project.managerId : team[0].id;

      const normalizedTasks = (parsed.tasks || []).map((t, i) => ({
        phase: t.phase || '3. Thi công lắp đặt',
        name: t.name || `Hạng mục công việc #${i + 1}`,
        assigneeId: validIds.has(t.assigneeId) ? t.assigneeId : team[i % team.length].id,
        startDate: t.startDate || parsed.project?.startDate || TODAY_STR,
        deadline: t.deadline || parsed.project?.endDate || TODAY_STR,
      }));

      const allowedCategories = [
        'Vật tư/Thiết bị',
        'Nhân công/Công tác phí',
        'Vận chuyển',
        'Thuê ngoài',
        'Chi phí khác',
      ];
      const normalizedBudget = (parsed.budgetPlan || []).map((b) => ({
        category: allowedCategories.includes(b.category) ? b.category : 'Vật tư/Thiết bị',
        amount: Number(b.amount) || 0,
        note: b.note || '',
      }));

      setExtractedState({
        contractData: {
          code: parsed.contract?.code || `HĐ-2026/0${contractsCount + 30}`,
          name: parsed.contract?.name || 'Hợp đồng thi công kỹ thuật mới',
          client: parsed.contract?.client || 'Khách hàng doanh nghiệp',
          value: Number(parsed.contract?.value) || 500000000,
          signedDate: parsed.contract?.signedDate || TODAY_STR,
          paymentStage: parsed.contract?.paymentStage || 'Tạm ứng (30%)',
          paidAmount: Number(parsed.contract?.paidAmount) || 0,
          notes: parsed.contract?.notes || '',
        },
        projectData: {
          code: parsed.project?.code || `DA-0${projectsCount + 1}-NEW`,
          name: parsed.project?.name || parsed.contract?.name || 'Dự án triển khai mới',
          startDate: parsed.project?.startDate || TODAY_STR,
          endDate: parsed.project?.endDate || '2026-12-20',
          managerId: safeManagerId,
          location: parsed.project?.location || 'TP. Hồ Chí Minh',
          priority: parsed.project?.priority || 'Cao',
        },
        tasksList: normalizedTasks,
        budgetPlanList: normalizedBudget,
      });

      clearInterval(stageTimer);
      setStep('review');
    } catch (err) {
      clearInterval(stageTimer);
      setStep('upload');
      setErrorMsg(
        err.message || 'Có lỗi xảy ra khi phân tích hợp đồng. Vui lòng kiểm tra lại nội dung hoặc thử mẫu có sẵn.'
      );
    }
  };

  // Các hàm cập nhật dữ liệu trên màn hình Review
  const updateContractField = (field, value) => {
    setExtractedState((prev) => ({
      ...prev,
      contractData: { ...prev.contractData, [field]: value },
    }));
  };

  const updateProjectField = (field, value) => {
    setExtractedState((prev) => ({
      ...prev,
      projectData: { ...prev.projectData, [field]: value },
    }));
  };

  const updateTaskRow = (index, field, value) => {
    setExtractedState((prev) => {
      const updated = [...prev.tasksList];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, tasksList: updated };
    });
  };

  const addTaskRow = () => {
    setExtractedState((prev) => ({
      ...prev,
      tasksList: [
        ...prev.tasksList,
        {
          phase: '3. Thi công lắp đặt',
          name: 'Hạng mục bổ sung mới',
          assigneeId: team[2]?.id || 'emp-3',
          startDate: prev.projectData.startDate,
          deadline: prev.projectData.endDate,
        },
      ],
    }));
  };

  const removeTaskRow = (index) => {
    setExtractedState((prev) => ({
      ...prev,
      tasksList: prev.tasksList.filter((_, i) => i !== index),
    }));
  };

  const updateBudgetRow = (index, field, value) => {
    setExtractedState((prev) => {
      const updated = [...prev.budgetPlanList];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, budgetPlanList: updated };
    });
  };

  const addBudgetRow = () => {
    setExtractedState((prev) => ({
      ...prev,
      budgetPlanList: [
        ...prev.budgetPlanList,
        { category: 'Chi phí khác', amount: 10000000, note: 'Chi phí dự phòng phát sinh' },
      ],
    }));
  };

  const removeBudgetRow = (index) => {
    setExtractedState((prev) => ({
      ...prev,
      budgetPlanList: prev.budgetPlanList.filter((_, i) => i !== index),
    }));
  };

  // Tính tổng dự toán & lợi nhuận dự kiến trên màn hình Review
  const reviewFinancials = useMemo(() => {
    if (!extractedState) return { contractVal: 0, totalBudget: 0, profit: 0, margin: 0 };
    const contractVal = Number(extractedState.contractData.value) || 0;
    const totalBudget = extractedState.budgetPlanList.reduce(
      (sum, b) => sum + (Number(b.amount) || 0),
      0
    );
    const profit = contractVal - totalBudget;
    const margin = contractVal > 0 ? (profit / contractVal) * 100 : 0;
    return { contractVal, totalBudget, profit, margin };
  }, [extractedState]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                Trợ lý AI Đọc & Triển khai Hợp đồng Tự động
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Gemini AI
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Tự động bóc tách Hợp đồng → Khởi tạo Dự án → Lập Kế hoạch WBS → Dự toán Chi phí & Phân bổ 6 Nhân sự
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: UPLOAD FILE OR PASTE CONTRACT */}
        {step === 'upload' && (
          <div className="p-6 overflow-y-auto space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Quick Sample Buttons */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-blue-600" />
                  Chưa có sẵn file trên máy? Nạp nhanh Hợp đồng mẫu để trải nghiệm AI:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SAMPLE_CONTRACT_TEXTS.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleLoadSample(sample)}
                    className="text-left p-3 rounded-xl bg-white border border-blue-200/80 hover:border-blue-500 hover:shadow-xs transition-all group"
                  >
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 mb-1">
                      {sample.badge}
                    </span>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 line-clamp-1">
                      {sample.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Drag & Drop File Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files?.[0]) {
                  handleFileSelect(e.dataTransfer.files[0]);
                }
              }}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/60'
                  : uploadedFile
                  ? 'border-emerald-400 bg-emerald-50/30'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
              }`}
            >
              <input
                id="contract-file-input"
                type="file"
                accept=".pdf,.txt,.md,.csv,.json,.png,.jpg,.jpeg,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />

              {uploadedFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{uploadedFile.name}</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Đã sẵn sàng để AI phân tích & trích xuất dữ liệu
                  </p>
                  <label
                    htmlFor="contract-file-input"
                    className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Chọn file khác
                  </label>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2.5">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    Kéo thả file Hợp đồng vào đây hoặc{' '}
                    <label
                      htmlFor="contract-file-input"
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      chọn từ máy tính
                    </label>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Hỗ trợ PDF, Hình ảnh scan hợp đồng (PNG/JPG), TXT, CSV, JSON
                  </p>
                </div>
              )}
            </div>

            {/* Paste or Edit Raw Text */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Nội dung văn bản Hợp đồng (Có thể dán trực tiếp hoặc kiểm tra nội dung đã nạp):
                </label>
                {rawText && (
                  <button
                    type="button"
                    onClick={() => {
                      setRawText('');
                      setUploadedFile(null);
                    }}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Xóa nội dung
                  </button>
                )}
              </div>
              <textarea
                rows={6}
                placeholder="Dán nội dung hợp đồng, phạm vi công việc, giá trị gói thầu và tiến độ vào đây nếu không tải file..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-3.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none leading-relaxed"
              />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={runGeminiAnalysis}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Bắt đầu Phân tích & Trích xuất Dữ liệu
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ANALYZING PROGRESS */}
        {step === 'analyzing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">Gemini AI đang bóc tách hợp đồng...</h4>
              <p className="text-sm font-medium text-blue-600 mt-1">{analysisStageText}</p>
              <p className="text-xs text-slate-400 mt-2 max-w-md">
                Hệ thống đang tự động lập cấu trúc phân chia công việc (WBS), phân bổ 6 nhân sự và tính toán ngân sách dự toán.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & EDIT EXTRACTED DATA BEFORE DEPLOYING */}
        {step === 'review' && extractedState && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Summary Strip */}
            <div className="px-6 py-3 bg-emerald-50/80 border-b border-emerald-200/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  AI đã trích xuất thành công! Kiểm tra & tinh chỉnh các mục dưới đây trước khi đẩy vào hệ thống:
                </span>
              </div>
              <div className="flex items-center gap-3 font-bold">
                <span className="text-slate-700">
                  HĐ: {formatCompactVND(reviewFinancials.contractVal)}
                </span>
                <span className="text-blue-700">
                  Dự toán: {formatCompactVND(reviewFinancials.totalBudget)}
                </span>
                <span className="text-emerald-700">
                  Lãi dự kiến: {formatCompactVND(reviewFinancials.profit)} ({reviewFinancials.margin.toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* 4 Mapping Tabs */}
            <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50 flex gap-2 overflow-x-auto shrink-0">
              {[
                { id: 'contract', label: '1. Thông tin Hợp đồng', icon: FileText },
                { id: 'project', label: '2. Khởi tạo Dự án', icon: FolderKanban },
                {
                  id: 'tasks',
                  label: `3. Kế hoạch Thi công (${extractedState.tasksList.length})`,
                  icon: Calendar,
                },
                {
                  id: 'budget',
                  label: `4. Dự toán Chi phí (${extractedState.budgetPlanList.length})`,
                  icon: Wallet,
                },
              ].map((t) => {
                const Icon = t.icon;
                const active = reviewTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setReviewTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl border-t border-x transition-all whitespace-nowrap ${
                      active
                        ? 'bg-white text-blue-700 border-slate-200 -mb-px'
                        : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Area */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* TAB 1: CONTRACT */}
              {reviewTab === 'contract' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mã Hợp đồng</label>
                    <input
                      type="text"
                      value={extractedState.contractData.code}
                      onChange={(e) => updateContractField('code', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày ký hợp đồng</label>
                    <input
                      type="date"
                      value={extractedState.contractData.signedDate}
                      onChange={(e) => updateContractField('signedDate', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tên gói thầu / Hợp đồng</label>
                    <input
                      type="text"
                      value={extractedState.contractData.name}
                      onChange={(e) => updateContractField('name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Chủ đầu tư / Khách hàng</label>
                    <input
                      type="text"
                      value={extractedState.contractData.client}
                      onChange={(e) => updateContractField('client', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Giá trị Hợp đồng (VNĐ)</label>
                    <input
                      type="number"
                      step="1000000"
                      value={extractedState.contractData.value}
                      onChange={(e) => updateContractField('value', Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-bold text-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Số tiền đã tạm ứng (VNĐ)</label>
                    <input
                      type="number"
                      step="1000000"
                      value={extractedState.contractData.paidAmount}
                      onChange={(e) => updateContractField('paidAmount', Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Đợt thanh toán hiện tại</label>
                    <input
                      type="text"
                      value={extractedState.contractData.paymentStage}
                      onChange={(e) => updateContractField('paymentStage', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ghi chú điều khoản</label>
                    <input
                      type="text"
                      value={extractedState.contractData.notes}
                      onChange={(e) => updateContractField('notes', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECT */}
              {reviewTab === 'project' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mã Dự án khởi tạo</label>
                    <input
                      type="text"
                      value={extractedState.projectData.code}
                      onChange={(e) => updateProjectField('code', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Quản lý Dự án phụ trách (PM)
                    </label>
                    <select
                      value={extractedState.projectData.managerId}
                      onChange={(e) => updateProjectField('managerId', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-semibold"
                    >
                      {team.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.role})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Dự án triển khai</label>
                    <input
                      type="text"
                      value={extractedState.projectData.name}
                      onChange={(e) => updateProjectField('name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày bắt đầu thi công</label>
                    <input
                      type="date"
                      value={extractedState.projectData.startDate}
                      onChange={(e) => updateProjectField('startDate', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hạn bàn giao nghiệm thu</label>
                    <input
                      type="date"
                      value={extractedState.projectData.endDate}
                      onChange={(e) => updateProjectField('endDate', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: WBS TASKS & TIMELINE */}
              {reviewTab === 'tasks' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-600">
                      AI đã tự động bóc tách các hạng mục thi công và phân công nhân sự phù hợp:
                    </p>
                    <button
                      type="button"
                      onClick={addTaskRow}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      <Plus className="w-3.5 h-3.5" /> Thêm hạng mục
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {extractedState.tasksList.map((task, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
                      >
                        <div className="sm:col-span-3">
                          <select
                            value={task.phase}
                            onChange={(e) => updateTaskRow(idx, 'phase', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          >
                            <option value="1. Khảo sát & Thiết kế">1. Khảo sát & Thiết kế</option>
                            <option value="2. Mua sắm vật tư/thiết bị">2. Mua sắm vật tư/thiết bị</option>
                            <option value="3. Thi công lắp đặt">3. Thi công lắp đặt</option>
                            <option value="4. Chạy thử & Bàn giao">4. Chạy thử & Bàn giao</option>
                          </select>
                        </div>
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) => updateTaskRow(idx, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            value={task.assigneeId}
                            onChange={(e) => updateTaskRow(idx, 'assigneeId', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          >
                            {team.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-2 flex gap-1">
                          <input
                            type="date"
                            value={task.deadline}
                            onChange={(e) => updateTaskRow(idx, 'deadline', e.target.value)}
                            className="w-full px-2 py-1.5 text-[11px] border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                        <div className="sm:col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => removeTaskRow(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: BUDGET ALLOCATION */}
              {reviewTab === 'budget' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-600">
                      Phân bổ ngân sách dự toán chi phí (Sẽ đồng bộ sang phân hệ Quản lý Chi phí & Lợi nhuận):
                    </p>
                    <button
                      type="button"
                      onClick={addBudgetRow}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    >
                      <Plus className="w-3.5 h-3.5" /> Thêm khoản dự toán
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {extractedState.budgetPlanList.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
                      >
                        <div className="sm:col-span-3">
                          <select
                            value={b.category}
                            onChange={(e) => updateBudgetRow(idx, 'category', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white"
                          >
                            <option value="Vật tư/Thiết bị">Vật tư/Thiết bị</option>
                            <option value="Nhân công/Công tác phí">Nhân công/Công tác phí</option>
                            <option value="Vận chuyển">Vận chuyển</option>
                            <option value="Thuê ngoài">Thuê ngoài</option>
                            <option value="Chi phí khác">Chi phí khác</option>
                          </select>
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="number"
                            step="1000000"
                            value={b.amount}
                            onChange={(e) => updateBudgetRow(idx, 'amount', Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            placeholder="Ghi chú hạng mục chi..."
                            value={b.note}
                            onChange={(e) => updateBudgetRow(idx, 'note', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                        <div className="sm:col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => removeBudgetRow(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Confirmation Bar */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setStep('upload')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/70"
              >
                ← Quay lại chọn file khác
              </button>

              <button
                type="button"
                onClick={() => onConfirmDeploy(extractedState)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Xác nhận & Đẩy dữ liệu vào toàn bộ Hệ thống
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 3. PHÂN HỆ DỰ ÁN & KẾ HOẠCH THI CÔNG (PROJECTS & GANTT SCHEDULE VIEW)
// ============================================================================

function ProjectsScheduleView({
  projects,
  selectedProjectId,
  setSelectedProjectId,
  tasks,
  setTasks,
  team,
  showToast,
  onExportCSV,
}) {
  const [viewMode, setViewMode] = useState('split'); // split | gantt | list
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const [taskForm, setTaskForm] = useState({
    phase: '3. Thi công lắp đặt',
    name: '',
    assigneeId: team[0]?.id || 'emp-1',
    startDate: TODAY_STR,
    deadline: TODAY_STR,
    progress: 0,
    status: 'Chưa làm',
  });

  // Tính toán khung thời gian Gantt cho dự án đang chọn
  const ganttBounds = useMemo(() => {
    if (!currentProject) return { minDate: new Date(TODAY_STR), maxDate: new Date(TODAY_STR), totalDays: 30, daysList: [] };

    const prjTasks = currentProject.tasks;
    let minD = new Date(currentProject.startDate);
    let maxD = new Date(currentProject.endDate);

    prjTasks.forEach((t) => {
      const s = new Date(t.startDate);
      const e = new Date(t.deadline);
      if (s < minD) minD = s;
      if (e > maxD) maxD = e;
    });

    // Thêm đệm 2 ngày đầu và cuối
    minD.setDate(minD.getDate() - 2);
    maxD.setDate(maxD.getDate() + 3);

    const totalDays = Math.max(7, Math.round((maxD - minD) / (1000 * 60 * 60 * 24)));
    const daysList = [];
    for (let i = 0; i <= totalDays; i++) {
      const d = new Date(minD);
      d.setDate(d.getDate() + i);
      daysList.push(d);
    }

    return { minDate: minD, maxDate: maxD, totalDays, daysList };
  }, [currentProject]);

  const openAddTask = () => {
    setEditingTask(null);
    setTaskForm({
      phase: '3. Thi công lắp đặt',
      name: '',
      assigneeId: team[2]?.id || 'emp-3',
      startDate: TODAY_STR,
      deadline: currentProject?.endDate || TODAY_STR,
      progress: 0,
      status: 'Chưa làm',
    });
    setIsTaskModalOpen(true);
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({
      phase: task.phase,
      name: task.name,
      assigneeId: task.assigneeId,
      startDate: task.startDate,
      deadline: task.deadline,
      progress: task.progress,
      status: task.status,
    });
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    const progressNum = Number(taskForm.progress);
    let autoStatus = taskForm.status;
    if (progressNum === 100) autoStatus = 'Hoàn thành';
    else if (progressNum > 0 && autoStatus === 'Chưa làm') autoStatus = 'Đang làm';

    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...t, ...taskForm, progress: progressNum, status: autoStatus } : t
        )
      );
      showToast('Đã cập nhật hạng mục thi công!');
    } else {
      const newTask = {
        id: `tsk-${Date.now()}`,
        projectId: currentProject.id,
        ...taskForm,
        progress: progressNum,
        status: autoStatus,
      };
      setTasks((prev) => [...prev, newTask]);
      showToast('Đã thêm hạng mục công việc mới!');
    }
    setIsTaskModalOpen(false);
  };

  const handleQuickProgressChange = (taskId, newProgress) => {
    const val = Number(newProgress);
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        let nextStatus = t.status;
        if (val === 100) nextStatus = 'Hoàn thành';
        else if (val > 0 && t.status === 'Chưa làm') nextStatus = 'Đang làm';
        else if (val < 100 && t.status === 'Hoàn thành') nextStatus = 'Đang làm';
        return { ...t, progress: val, status: nextStatus };
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Đã xóa hạng mục công việc.');
  };

  if (!currentProject) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
        <p className="text-slate-600">Chưa có dự án nào. Hãy chuyển đổi từ Hợp đồng sang Dự án!</p>
      </div>
    );
  }

  // Vị trí vạch "Hôm nay" trên thanh Gantt
  const todayOffsetDays = Math.round((new Date(TODAY_STR) - ganttBounds.minDate) / (1000 * 60 * 60 * 24));
  const todayPercent = Math.min(100, Math.max(0, (todayOffsetDays / ganttBounds.totalDays) * 100));

  return (
    <div className="space-y-5">
      {/* Project Selector Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-xs font-bold uppercase text-slate-500">Chọn Dự án:</label>
            <select
              value={currentProject.id}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  [{p.code}] {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-semibold">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Bảng + Gantt
              </button>
              <button
                onClick={() => setViewMode('gantt')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'gantt' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Chỉ Timeline Gantt
              </button>
            </div>

            <button
              onClick={openAddTask}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Thêm Hạng mục
            </button>
          </div>
        </div>

        {/* Project Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-slate-500 block">Chủ đầu tư</span>
            <span className="font-bold text-slate-900 line-clamp-1 mt-0.5">{currentProject.client}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50">
            <span className="text-slate-500 block">Thời gian thi công</span>
            <span className="font-bold text-slate-900 mt-0.5 block">
              {formatDateVN(currentProject.startDate)} → {formatDateVN(currentProject.endDate)}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50/70">
            <span className="text-blue-700 block">Tiến độ tổng thể</span>
            <span className="font-bold text-blue-900 text-sm mt-0.5 block">
              {currentProject.avgProgress}% ({currentProject.tasks.filter((t) => t.status === 'Hoàn thành').length}/
              {currentProject.tasks.length} việc)
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/70">
            <span className="text-emerald-700 block">Giá trị HĐ / Dự toán</span>
            <span className="font-bold text-emerald-900 mt-0.5 block">
              {formatCompactVND(currentProject.contractValue)} / {formatCompactVND(currentProject.plannedBudget)}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Trạng thái</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{currentProject.status}</span>
            </div>
            <button
              onClick={() => onExportCSV(currentProject.id)}
              title="Xuất CSV dự án này"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* GANTT TIMELINE VISUALIZATION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Biểu đồ Tiến độ Thi công (Gantt Timeline)
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" /> Hoàn thành
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-blue-500 inline-block" /> Đang thi công
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-rose-500 inline-block" /> Trễ hạn
            </span>
            <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
              <span className="w-0.5 h-3.5 bg-rose-500 inline-block" /> Hôm nay ({formatDateVN(TODAY_STR)})
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[820px] p-5">
            {/* Timeline Date Header */}
            <div className="grid grid-cols-12 gap-4 pb-2 border-b border-slate-200 text-[11px] font-semibold text-slate-500">
              <div className="col-span-4">Hạng mục & Phụ trách</div>
              <div className="col-span-8 relative flex justify-between px-1">
                <span>{ganttBounds.minDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</span>
                <span>
                  {new Date(
                    ganttBounds.minDate.getTime() + (ganttBounds.totalDays * 0.25) * 86400000
                  ).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </span>
                <span>
                  {new Date(
                    ganttBounds.minDate.getTime() + (ganttBounds.totalDays * 0.5) * 86400000
                  ).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </span>
                <span>
                  {new Date(
                    ganttBounds.minDate.getTime() + (ganttBounds.totalDays * 0.75) * 86400000
                  ).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </span>
                <span>{ganttBounds.maxDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</span>
              </div>
            </div>

            {/* Gantt Rows */}
            <div className="divide-y divide-slate-100 relative">
              {currentProject.tasks.map((task) => {
                const assignee = team.find((m) => m.id === task.assigneeId);
                const startOffset = Math.max(
                  0,
                  Math.round((new Date(task.startDate) - ganttBounds.minDate) / (1000 * 60 * 60 * 24))
                );
                const durationDays = Math.max(
                  1,
                  Math.round((new Date(task.deadline) - new Date(task.startDate)) / (1000 * 60 * 60 * 24)) + 1
                );

                const leftPct = (startOffset / ganttBounds.totalDays) * 100;
                const widthPct = Math.min(100 - leftPct, Math.max(4, (durationDays / ganttBounds.totalDays) * 100));

                const isOverdue = task.status !== 'Hoàn thành' && getDaysDiff(task.deadline, TODAY_STR) < 0;
                const barBg =
                  task.status === 'Hoàn thành'
                    ? 'bg-emerald-500'
                    : isOverdue || task.status === 'Trễ hạn'
                    ? 'bg-rose-500'
                    : task.progress > 0
                    ? 'bg-blue-500'
                    : 'bg-slate-400';

                return (
                  <div key={task.id} className="grid grid-cols-12 gap-4 py-3 items-center hover:bg-slate-50/60">
                    <div className="col-span-4 pr-2">
                      <div className="text-[10px] font-bold uppercase text-slate-400">{task.phase}</div>
                      <div className="text-xs font-bold text-slate-900 truncate" title={task.name}>
                        {task.name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`w-4 h-4 rounded-full ${
                            assignee?.color || 'bg-slate-500'
                          } text-white text-[9px] font-bold flex items-center justify-center`}
                        >
                          {assignee?.avatar}
                        </span>
                        <span className="text-[11px] text-slate-600">{assignee?.name}</span>
                      </div>
                    </div>

                    <div className="col-span-8 relative h-8 bg-slate-100/80 rounded-lg flex items-center">
                      {/* Today Vertical Line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-rose-500/80 z-10 pointer-events-none"
                        style={{ left: `${todayPercent}%` }}
                      />

                      {/* Task Bar */}
                      <div
                        onClick={() => openEditTask(task)}
                        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                        title={`${task.name} (${formatDateVN(task.startDate)} - ${formatDateVN(
                          task.deadline
                        )}) - ${task.progress}%`}
                        className={`absolute h-6 rounded-md ${barBg} text-white text-[10px] font-bold flex items-center px-2 shadow-xs cursor-pointer hover:opacity-90 transition-all overflow-hidden whitespace-nowrap`}
                      >
                        {task.progress}% • {formatDateVN(task.deadline).slice(0, 5)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* TASK LIST TABLE (When in Split mode) */}
      {viewMode === 'split' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Bảng Chi tiết Hạng mục & Cập nhật Tiến độ Nhanh
            </h3>
            <span className="text-xs text-slate-500">Kéo thanh trượt để cập nhật % hoàn thành trực tiếp</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="py-3 px-4">Giai đoạn / Hạng mục</th>
                  <th className="py-3 px-4">Người phụ trách</th>
                  <th className="py-3 px-4">Thời hạn (Deadline)</th>
                  <th className="py-3 px-4 w-52">% Hoàn thành</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {currentProject.tasks.map((task) => {
                  const assignee = team.find((m) => m.id === task.assigneeId);
                  const daysLeft = getDaysDiff(task.deadline, TODAY_STR);
                  const isOverdue = task.status !== 'Hoàn thành' && daysLeft < 0;

                  return (
                    <tr key={task.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-semibold text-blue-600 block">{task.phase}</span>
                        <span className="font-bold text-slate-900">{task.name}</span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full ${
                              assignee?.color || 'bg-slate-500'
                            } text-white text-[10px] font-bold flex items-center justify-center`}
                          >
                            {assignee?.avatar}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-slate-800">{assignee?.name}</div>
                            <div className="text-[10px] text-slate-500">{assignee?.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-xs font-semibold text-slate-800">
                          {formatDateVN(task.startDate)} → {formatDateVN(task.deadline)}
                        </div>
                        {task.status !== 'Hoàn thành' && (
                          <div
                            className={`text-[11px] font-bold mt-0.5 ${
                              isOverdue
                                ? 'text-rose-600'
                                : daysLeft <= 7
                                ? 'text-amber-600'
                                : 'text-slate-400'
                            }`}
                          >
                            {isOverdue
                              ? `Quá hạn ${Math.abs(daysLeft)} ngày`
                              : `Còn ${daysLeft} ngày`}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={task.progress}
                            onChange={(e) => handleQuickProgressChange(task.id, e.target.value)}
                            className="w-28 accent-blue-600 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-900 w-9 text-right">
                            {task.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            task.status === 'Hoàn thành'
                              ? 'bg-emerald-100 text-emerald-700'
                              : isOverdue || task.status === 'Trễ hạn'
                              ? 'bg-rose-100 text-rose-700'
                              : task.status === 'Đang làm'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isOverdue && task.status !== 'Hoàn thành' ? 'Trễ hạn' : task.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => openEditTask(task)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 mr-1"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add/Edit Task */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingTask ? 'Cập nhật Hạng mục Thi công' : 'Thêm Hạng mục Công việc mới'}
              </h3>
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Giai đoạn triển khai</label>
                <select
                  value={taskForm.phase}
                  onChange={(e) => setTaskForm({ ...taskForm, phase: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1. Khảo sát & Thiết kế">1. Khảo sát & Thiết kế</option>
                  <option value="2. Mua sắm vật tư/thiết bị">2. Mua sắm vật tư/thiết bị</option>
                  <option value="3. Thi công lắp đặt">3. Thi công lắp đặt</option>
                  <option value="4. Chạy thử & Bàn giao">4. Chạy thử & Bàn giao</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tên hạng mục công việc *</label>
                <input
                  required
                  type="text"
                  placeholder="VD: Lắp đặt tủ điện phân phối tầng 2..."
                  value={taskForm.name}
                  onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Người phụ trách (Đội ngũ 6 người)</label>
                <select
                  value={taskForm.assigneeId}
                  onChange={(e) => setTaskForm({ ...taskForm, assigneeId: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {team.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày bắt đầu *</label>
                  <input
                    required
                    type="date"
                    value={taskForm.startDate}
                    onChange={(e) => setTaskForm({ ...taskForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hạn chót (Deadline) *</label>
                  <input
                    required
                    type="date"
                    value={taskForm.deadline}
                    onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiến độ hoàn thành ({taskForm.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={taskForm.progress}
                    onChange={(e) => setTaskForm({ ...taskForm, progress: Number(e.target.value) })}
                    className="w-full mt-2 accent-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Trạng thái</label>
                  <select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Chưa làm">Chưa làm</option>
                    <option value="Đang làm">Đang làm</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Trễ hạn">Trễ hạn</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
                >
                  Lưu Hạng mục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 4. PHÂN HỆ QUẢN LÝ CHI PHÍ & LỢI NHUẬN DỰ ÁN (COST & BUDGET VIEW)
// ============================================================================

function FinanceBudgetView({
  projects,
  setProjects,
  expenses,
  setExpenses,
  team,
  selectedProjectId,
  setSelectedProjectId,
  showToast,
}) {
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(currentProject?.plannedBudget || 0);

  // Expense Form
  const [expForm, setExpForm] = useState({
    date: TODAY_STR,
    category: 'Vật tư/Thiết bị',
    amount: '',
    requesterId: team[2]?.id || 'emp-3',
    status: 'Đã duyệt',
    note: '',
  });

  useEffect(() => {
    if (currentProject) setBudgetInput(currentProject.plannedBudget);
  }, [currentProject]);

  const handleUpdateBudget = () => {
    setProjects((prev) =>
      prev.map((p) => (p.id === currentProject.id ? { ...p, plannedBudget: Number(budgetInput) || 0 } : p))
    );
    setIsEditingBudget(false);
    showToast('Đã cập nhật ngân sách dự toán của dự án!');
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amountNum = Number(expForm.amount);
    if (!amountNum || amountNum <= 0) return;

    const newExp = {
      id: `exp-${Date.now()}`,
      projectId: currentProject.id,
      date: expForm.date,
      category: expForm.category,
      amount: amountNum,
      requesterId: expForm.requesterId,
      status: expForm.status,
      note: expForm.note,
    };

    setExpenses((prev) => [newExp, ...prev]);
    setExpForm({ ...expForm, amount: '', note: '' });

    const projectedTotal = currentProject.totalActualCost + amountNum;
    if (projectedTotal > currentProject.plannedBudget) {
      showToast('CẢNH BÁO: Khoản chi này làm tổng chi phí vượt ngân sách dự toán!', 'warning');
    } else {
      showToast('Đã ghi nhận khoản chi phí mới vào dự án!');
    }
  };

  const handleToggleApprove = (expId) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === expId ? { ...e, status: e.status === 'Đã duyệt' ? 'Chờ duyệt' : 'Đã duyệt' } : e
      )
    );
    showToast('Đã cập nhật trạng thái duyệt chi!');
  };

  const handleDeleteExpense = (expId) => {
    setExpenses((prev) => prev.filter((e) => e.id !== expId));
    showToast('Đã xóa khoản chi.');
  };

  if (!currentProject) return null;

  // Nhóm chi phí theo danh mục để hiển thị trực quan
  const categoryBreakdown = useMemo(() => {
    const categories = [
      'Vật tư/Thiết bị',
      'Nhân công/Công tác phí',
      'Vận chuyển',
      'Thuê ngoài',
      'Chi phí khác',
    ];
    return categories.map((cat) => {
      const total = currentProject.expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + Number(e.amount || 0), 0);
      const pct =
        currentProject.totalActualCost > 0
          ? Math.round((total / currentProject.totalActualCost) * 100)
          : 0;
      return { category: cat, total, pct };
    });
  }, [currentProject]);

  return (
    <div className="space-y-6">
      {/* Project Selector & Budget Alert Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold uppercase text-slate-500">Dự án phân tích:</label>
          <select
            value={currentProject.id}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl outline-none"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                [{p.code}] {p.name}
              </option>
            ))}
          </select>
        </div>

        {currentProject.isOverBudget ? (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            CẢNH BÁO: Chi phí thực tế đang vượt dự toán{' '}
            {formatVND(currentProject.totalActualCost - currentProject.plannedBudget)}!
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Ngân sách khả dụng còn lại:{' '}
            <strong>{formatVND(currentProject.plannedBudget - currentProject.totalActualCost)}</strong>
          </div>
        )}
      </div>

      {/* 4 Financial Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Giá trị Hợp đồng</span>
          <div className="text-xl font-bold text-slate-900 mt-2">
            {formatVND(currentProject.contractValue)}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Doanh thu ký kết trước thuế</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Ngân sách Dự toán</span>
            <button
              onClick={() => setIsEditingBudget(!isEditingBudget)}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              {isEditingBudget ? 'Đóng' : 'Sửa'}
            </button>
          </div>
          {isEditingBudget ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                step="1000000"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="w-full px-2.5 py-1 text-sm border border-blue-400 rounded-lg font-bold"
              />
              <button
                onClick={handleUpdateBudget}
                className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg"
              >
                Lưu
              </button>
            </div>
          ) : (
            <div className="text-xl font-bold text-blue-700 mt-2">
              {formatVND(currentProject.plannedBudget)}
            </div>
          )}
          <span className="text-xs text-slate-400 mt-1 block">
            Định mức chi phí mục tiêu ({Math.round((currentProject.plannedBudget / currentProject.contractValue) * 100)}% HĐ)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Chi phí Thực tế</span>
          <div
            className={`text-xl font-bold mt-2 ${
              currentProject.isOverBudget ? 'text-rose-600' : 'text-slate-900'
            }`}
          >
            {formatVND(currentProject.totalActualCost)}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Đã duyệt: {formatCompactVND(currentProject.approvedCost)} • Chờ duyệt:{' '}
            {formatCompactVND(currentProject.pendingCost)}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Lợi nhuận Thực tế</span>
          <div
            className={`text-xl font-bold mt-2 ${
              currentProject.profit >= 0 ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {formatVND(currentProject.profit)}
          </div>
          <span
            className={`inline-block mt-1 px-2 py-0.5 text-xs font-bold rounded-full ${
              currentProject.profitMargin >= 20
                ? 'bg-emerald-100 text-emerald-800'
                : currentProject.profitMargin >= 10
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            Biên lợi nhuận: {currentProject.profitMargin.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Category Breakdown + Quick Add Expense Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cost Structure Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Cơ cấu Chi phí theo Hạng mục</h3>
          <div className="space-y-3.5">
            {categoryBreakdown.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">{item.category}</span>
                  <span className="font-bold text-slate-900">
                    {formatCompactVND(item.total)} ({item.pct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-600" /> Ghi nhận Khoản chi mới cho Dự án {currentProject.code}
          </h3>
          <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày chi *</label>
              <input
                required
                type="date"
                value={expForm.date}
                onChange={(e) => setExpForm({ ...expForm, date: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hạng mục chi *</label>
              <select
                value={expForm.category}
                onChange={(e) => setExpForm({ ...expForm, category: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Vật tư/Thiết bị">Vật tư/Thiết bị</option>
                <option value="Nhân công/Công tác phí">Nhân công/Công tác phí</option>
                <option value="Vận chuyển">Vận chuyển</option>
                <option value="Thuê ngoài">Thuê ngoài</option>
                <option value="Chi phí khác">Chi phí khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Số tiền (VNĐ) *</label>
              <input
                required
                type="number"
                min="1000"
                step="10000"
                placeholder="VD: 15000000"
                value={expForm.amount}
                onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Người đề xuất / Chi</label>
              <select
                value={expForm.requesterId}
                onChange={(e) => setExpForm({ ...expForm, requesterId: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Trạng thái duyệt</label>
              <select
                value={expForm.status}
                onChange={(e) => setExpForm({ ...expForm, status: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Chờ duyệt">Chờ duyệt</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Số hóa đơn / Ghi chú *</label>
              <input
                required
                type="text"
                placeholder="VD: HĐ VAT #123 - Mua cáp..."
                value={expForm.note}
                onChange={(e) => setExpForm({ ...expForm, note: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end pt-1">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
              >
                + Thêm khoản chi vào Sổ dự án
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Expense Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Nhật ký Chi phí Chi tiết ({currentProject.expenses.length} phiếu chi)
          </h3>
          <span className="text-xs text-slate-500">Nhấp vào trạng thái để duyệt / hoàn duyệt nhanh</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                <th className="py-3 px-4">Ngày chi</th>
                <th className="py-3 px-4">Hạng mục chi</th>
                <th className="py-3 px-4">Diễn giải / Số hóa đơn</th>
                <th className="py-3 px-4">Người đề xuất</th>
                <th className="py-3 px-4 text-right">Số tiền (VNĐ)</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {currentProject.expenses.map((exp) => {
                const requester = team.find((m) => m.id === exp.requesterId);
                return (
                  <tr key={exp.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs font-semibold text-slate-700">
                      {formatDateVN(exp.date)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-700 font-medium">{exp.note}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-700">
                      {requester?.name || '---'}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-right font-bold text-slate-900">
                      {formatVND(exp.amount)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleApprove(exp.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                          exp.status === 'Đã duyệt'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {exp.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteExpense(exp.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. PHÂN HỆ ĐỘI NGŨ 6 NHÂN SỰ & WORKLOAD (TEAM & WORKLOAD VIEW)
// ============================================================================

function TeamWorkloadView({ team, setTeam, tasks, projects, showToast, onJumpToTask }) {
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: '', role: '', phone: '' });

  const openEditMember = (member) => {
    setEditingMember(member);
    setMemberForm({ name: member.name, role: member.role, phone: member.phone });
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    setTeam((prev) =>
      prev.map((m) => (m.id === editingMember.id ? { ...m, ...memberForm } : m))
    );
    setEditingMember(null);
    showToast('Đã cập nhật thông tin nhân sự!');
  };

  // Tính toán Workload cho từng người trong đội 6 nhân sự
  const teamStats = useMemo(() => {
    return team.map((member) => {
      const assignedTasks = tasks.filter((t) => t.assigneeId === member.id);
      const activeTasks = assignedTasks.filter((t) => t.status !== 'Hoàn thành');
      const completedTasks = assignedTasks.filter((t) => t.status === 'Hoàn thành');
      const dueSoonTasks = activeTasks.filter((t) => getDaysDiff(t.deadline, TODAY_STR) <= 7);

      // Đánh giá trạng thái tải công việc (Quy mô công ty nhỏ: <=1 việc rảnh, 2-3 việc vừa tải, >=4 việc quá tải)
      let loadStatus = 'Vừa tải';
      let loadBadgeClass = 'bg-blue-100 text-blue-700';
      if (activeTasks.length <= 1) {
        loadStatus = 'Rảnh / Sẵn sàng';
        loadBadgeClass = 'bg-emerald-100 text-emerald-700';
      } else if (activeTasks.length >= 4) {
        loadStatus = 'Quá tải';
        loadBadgeClass = 'bg-rose-100 text-rose-700';
      }

      return {
        ...member,
        assignedTasks,
        activeTasks,
        completedTasks,
        dueSoonTasks,
        loadStatus,
        loadBadgeClass,
      };
    });
  }, [team, tasks]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Phân bổ Nguồn lực & Khối lượng Công việc (Đội ngũ {team.length} Nhân sự)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Theo dõi mức độ bận rộn của từng kỹ sư/nhân sự để điều phối công việc kịp thời, tránh dồn ứ tiến độ
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">≤ 1 việc: Rảnh</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">2-3 việc: Vừa tải</span>
          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">≥ 4 việc: Quá tải</span>
        </div>
      </div>

      {/* 6 Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamStats.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between"
          >
            <div>
              {/* Top Profile */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl ${member.color} text-white font-bold text-base flex items-center justify-center shadow-sm`}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{member.name}</h4>
                    <p className="text-xs font-medium text-slate-500">{member.role}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{member.phone}</p>
                  </div>
                </div>

                <button
                  onClick={() => openEditMember(member)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                  title="Chỉnh sửa thông tin nhân sự"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Workload Status & Metrics */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-600">Trạng thái tải:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${member.loadBadgeClass}`}>
                    {member.loadStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-blue-50/70">
                    <div className="text-lg font-bold text-blue-700">{member.activeTasks.length}</div>
                    <div className="text-[11px] text-slate-600">Đang phụ trách</div>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50/70">
                    <div className="text-lg font-bold text-amber-700">{member.dueSoonTasks.length}</div>
                    <div className="text-[11px] text-slate-600">Sắp đến hạn</div>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50/70">
                    <div className="text-lg font-bold text-emerald-700">{member.completedTasks.length}</div>
                    <div className="text-[11px] text-slate-600">Đã xong</div>
                  </div>
                </div>
              </div>

              {/* Active Tasks List */}
              <div className="mt-4">
                <div className="text-xs font-bold text-slate-700 mb-2">
                  Đầu việc đang triển khai ({member.activeTasks.length}):
                </div>
                {member.activeTasks.length === 0 ? (
                  <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-400 text-center">
                    Hiện chưa có đầu việc tồn đọng. Có thể giao thêm việc mới!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {member.activeTasks.map((t) => {
                      const prj = projects.find((p) => p.id === t.projectId);
                      const daysLeft = getDaysDiff(t.deadline, TODAY_STR);
                      return (
                        <div
                          key={t.id}
                          onClick={() => onJumpToTask(t.projectId)}
                          className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between text-[10px] mb-0.5">
                            <span className="font-bold text-blue-700">{prj?.code}</span>
                            <span
                              className={`font-bold ${
                                daysLeft < 0
                                  ? 'text-rose-600'
                                  : daysLeft <= 7
                                  ? 'text-amber-600'
                                  : 'text-slate-500'
                              }`}
                            >
                              Hạn: {formatDateVN(t.deadline)}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 line-clamp-1">{t.name}</p>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${t.progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Cập nhật Thông tin Nhân sự</h3>
              <button
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên *</label>
                <input
                  required
                  type="text"
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chức danh / Vai trò *</label>
                <input
                  required
                  type="text"
                  value={memberForm.role}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại liên hệ</label>
                <input
                  type="text"
                  value={memberForm.phone}
                  onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}